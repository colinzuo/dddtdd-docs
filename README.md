# Sample Docs Server

## Generate static doc sites using vuepress
Take vuepress_demo for example, base in docs/.vuepress/config.js needs to be set to '/docs/DOC_PROJECT/', such as
'/docs/group_fruit/' in the demo

use yarn install to init

use yarn docs:dev to develop

use deploy.sh to sync the produced files to target server

## Nginx Server
use docker nginx  to serve static doc sites produced by vuepress

Place the files to /srv/docs/DOC_PROJECT/

Use the following command to start the container

sudo docker-compose up -d

## verify

access url such as http://TARGET_IP/docs/group_fruit/pear/
