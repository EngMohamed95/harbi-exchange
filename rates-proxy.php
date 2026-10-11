<?php
// Same-origin proxy for the ClearView rates feed: the upstream server sends no CORS
// headers, so the site's JavaScript cannot fetch it directly. The URL is fixed on
// purpose so this cannot be used as an open proxy.

const FEED_URL = 'https://rates.clearviewsys.com/alharbiexchange/uploads/ma/xml/rateswithcss.xml';
const CACHE_SECONDS = 30;

$cacheFile = sys_get_temp_dir() . '/harbi-rates-feed.xml';

header('Content-Type: application/xml; charset=ISO-8859-1');
header('Cache-Control: no-store');

if (is_file($cacheFile) && time() - filemtime($cacheFile) < CACHE_SECONDS) {
    readfile($cacheFile);
    exit;
}

$xml = false;
if (function_exists('curl_init')) {
    $ch = curl_init(FEED_URL);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT => 10,
    ]);
    $body = curl_exec($ch);
    if ($body !== false && curl_getinfo($ch, CURLINFO_HTTP_CODE) === 200) {
        $xml = $body;
    }
    curl_close($ch);
}
if ($xml === false) {
    $xml = @file_get_contents(FEED_URL, false, stream_context_create(['http' => ['timeout' => 10]]));
}

if ($xml !== false && strpos($xml, '<RATE>') !== false) {
    @file_put_contents($cacheFile, $xml, LOCK_EX);
    echo $xml;
} elseif (is_file($cacheFile)) {
    // Upstream is down: serve the last copy we fetched rather than nothing.
    readfile($cacheFile);
} else {
    http_response_code(502);
    echo '<error>Rates feed unavailable</error>';
}
