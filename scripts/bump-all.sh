#!/usr/bin/env bash
set -e
BUMP="${1:-patch}"
case "$BUMP" in
  major|minor|patch) ;;
  *) echo "Usage: $0 [patch|minor|major]" >&2; exit 1 ;;
esac

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

packages=(
  .
  template
  packages/core
  packages/next
  packages/templates
  packages/create-landing-app
)

for dir in "${packages[@]}"; do
  (cd "$dir" && npm version "$BUMP" --no-git-tag-version) && echo "$dir"
done

version=$(node -p "require('./package.json').version")
git add .
git commit -m "🔖 Bump versions to \`v$version\`"
