#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd build

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:colinzuo/docs_server.git master:gh-pages

cd -

rm -rf build