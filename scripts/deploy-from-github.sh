#!/usr/bin/env bash
# Copies the latest build of the site (the `deploy` branch, produced by GitHub Actions)
# into the web root. Safe to run repeatedly, e.g. from cron: it does nothing when the
# web root already has the latest build.
#
# Usage:  bash deploy-from-github.sh            (web root defaults to ~/public_html)
#         WEBROOT=/path/to/root bash deploy-from-github.sh
set -euo pipefail

REPO="EngMohamed95/harbi-exchange"
BRANCH="deploy"
WEBROOT="${WEBROOT:-$HOME/public_html}"
STATE_FILE="$HOME/.harbi-deployed-sha"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }

[ -d "$WEBROOT" ] || { log "Web root not found: $WEBROOT" >&2; exit 1; }

if command -v git >/dev/null 2>&1; then
  sha=$(git ls-remote "https://github.com/$REPO.git" "refs/heads/$BRANCH" | cut -f1)
else
  sha=$(curl -fsSL -H "Accept: application/vnd.github.sha" "https://api.github.com/repos/$REPO/commits/$BRANCH")
fi
[ -n "$sha" ] || { log "Could not find the $BRANCH branch on GitHub" >&2; exit 1; }

if [ -f "$STATE_FILE" ] && [ "$(cat "$STATE_FILE")" = "$sha" ]; then
  log "Already up to date (${sha:0:7})"
  exit 0
fi

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

curl -fsSL "https://codeload.github.com/$REPO/tar.gz/$sha" | tar -xz -C "$tmp" --strip-components=1
[ -f "$tmp/index.html" ] || { log "Downloaded build has no index.html, aborting" >&2; exit 1; }

# Keep a copy of a pre-existing .htaccess that isn't ours before overwriting it.
if [ -f "$WEBROOT/.htaccess" ] && ! cmp -s "$WEBROOT/.htaccess" "$tmp/.htaccess"; then
  cp "$WEBROOT/.htaccess" "$HOME/htaccess.backup.$(date +%Y%m%d%H%M%S)"
fi

cp -R "$tmp/." "$WEBROOT/"

# Remove hashed assets left over from previous builds.
if [ -d "$WEBROOT/assets" ]; then
  for f in "$WEBROOT"/assets/*; do
    [ -e "$tmp/assets/$(basename "$f")" ] || rm -f "$f"
  done
fi

echo "$sha" > "$STATE_FILE"
log "Deployed ${sha:0:7} to $WEBROOT"
