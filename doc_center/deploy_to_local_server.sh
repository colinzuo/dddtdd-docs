#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd build

DEST_BASE_DIR=/srv/dddtdd-docs/
OPTIONS="-avzh --delete"
TARGET_IP=127.0.0.1

rsync ${OPTIONS} ./ colinzuo@${TARGET_IP}:${DEST_BASE_DIR}

cd -
