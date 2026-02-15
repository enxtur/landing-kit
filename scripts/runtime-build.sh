#!/usr/bin/env sh
set -e

CONFIG_PATH="/landing.config.ts"

if [ ! -f "$CONFIG_PATH" ]; then
  echo "Error: $CONFIG_PATH not found"
  echo "You should mount the config file to the container"
  echo "For example: -v ./landing.config.ts:/landing.config.ts"
  exit 1
fi

echo "Building runtime..."

cp /landing.config.ts /app/

cd /app

npm run build

error=$?

if [ $error -ne 0 ]; then
  echo "Build failed"
  echo "Error: $error"
  exit 1
fi

echo "Build completed successfully"

exit 0