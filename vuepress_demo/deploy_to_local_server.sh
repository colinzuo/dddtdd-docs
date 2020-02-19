#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

DEST_BASE_DIR=/srv/docs_server/
OPTIONS="-avzh --delete"

rsync ${OPTIONS} ./ colinzuo@10.11.34.182:${DEST_BASE_DIR}

cd -
