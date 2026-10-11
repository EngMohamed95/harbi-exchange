<?php
// Copies the latest build of the site (the `deploy` branch, produced by GitHub Actions)
// into the web root. Safe to run repeatedly, e.g. from cron: it does nothing when the
// web root already has the latest build. Written in PHP because shell download tools
// (curl/wget) are blocked on the host.
//
// Usage:  php deploy-from-github.php [web-root]     (web root defaults to ~/public_html)

const REPO = 'EngMohamed95/harbi-exchange';
const BRANCH = 'deploy';

$home = getenv('HOME') ?: dirname(__DIR__);
$webroot = rtrim($argv[1] ?? "$home/public_html", '/');
$stateFile = "$home/.harbi-deployed-sha";

function logMsg(string $msg): void
{
    echo '[' . date('Y-m-d H:i:s') . "] $msg\n";
}

function fail(string $msg): void
{
    logMsg($msg);
    exit(1);
}

function fetch(string $url): string
{
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_TIMEOUT => 60,
            CURLOPT_USERAGENT => 'harbi-deploy',
        ]);
        $body = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($body !== false && $code === 200) {
            return $body;
        }
    }
    $ctx = stream_context_create(['http' => ['user_agent' => 'harbi-deploy', 'timeout' => 60]]);
    $body = @file_get_contents($url, false, $ctx);
    if ($body === false) {
        fail("Download failed: $url");
    }
    return $body;
}

function copyTree(string $from, string $to): void
{
    $items = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($from, FilesystemIterator::SKIP_DOTS),
        RecursiveIteratorIterator::SELF_FIRST
    );
    foreach ($items as $item) {
        $target = $to . substr($item->getPathname(), strlen($from));
        if ($item->isDir()) {
            is_dir($target) || mkdir($target, 0755, true);
        } elseif (!copy($item->getPathname(), $target)) {
            fail("Could not write $target");
        }
    }
}

function removeTree(string $dir): void
{
    if (!is_dir($dir)) return;
    $items = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS),
        RecursiveIteratorIterator::CHILD_FIRST
    );
    foreach ($items as $item) {
        $item->isDir() ? rmdir($item->getPathname()) : unlink($item->getPathname());
    }
    rmdir($dir);
}

is_dir($webroot) || fail("Web root not found: $webroot");

$commit = json_decode(fetch('https://api.github.com/repos/' . REPO . '/commits/' . BRANCH), true);
$sha = $commit['sha'] ?? '';
preg_match('/^[0-9a-f]{40}$/', $sha) || fail('Could not find the ' . BRANCH . ' branch on GitHub');

if (is_file($stateFile) && trim(file_get_contents($stateFile)) === $sha) {
    logMsg('Already up to date (' . substr($sha, 0, 7) . ')');
    exit(0);
}

$tmp = sys_get_temp_dir() . '/harbi-deploy-' . getmypid();
removeTree($tmp);
mkdir($tmp, 0700, true);
register_shutdown_function('removeTree', $tmp);

$zipPath = "$tmp/build.zip";
file_put_contents($zipPath, fetch('https://codeload.github.com/' . REPO . "/zip/$sha"));
(new PharData($zipPath))->extractTo("$tmp/x");

// GitHub wraps the archive in a single top-level folder.
$dirs = glob("$tmp/x/*", GLOB_ONLYDIR);
$build = $dirs[0] ?? '';
is_file("$build/index.html") || fail('Downloaded build has no index.html, aborting');

// Keep a copy of a pre-existing .htaccess that isn't ours before overwriting it.
if (is_file("$webroot/.htaccess") && file_get_contents("$webroot/.htaccess") !== file_get_contents("$build/.htaccess")) {
    copy("$webroot/.htaccess", "$home/htaccess.backup." . date('YmdHis'));
}

copyTree($build, $webroot);

// Remove hashed assets left over from previous builds.
foreach (glob("$webroot/assets/*") ?: [] as $file) {
    if (!file_exists("$build/assets/" . basename($file))) {
        unlink($file);
    }
}

file_put_contents($stateFile, $sha);
logMsg('Deployed ' . substr($sha, 0, 7) . " to $webroot");
