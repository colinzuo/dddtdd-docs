---
title: Nginx
---

## Setup a github repo
<https://github.com/colinzuo/dddtdd-docs>

## Create Self Signed Certificates
<https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04>

```
/srv/cert$ ls -l
total 8
-rw-r--r-- 1 root root 1468 Feb 29 10:14 nginx-selfsigned.crt
-rw------- 1 root root 1704 Feb 29 10:14 nginx-selfsigned.key
```

### Let's Encrypt for Local Network
<https://r.je/guide-lets-encrypt-certificate-for-local-development>

### Let's Encrypt for free public
<https://letsencrypt.org/getting-started/>

<https://gist.github.com/cecilemuller/a26737699a7e70a7093d4dc115915de8>

## Setup docker-compose file
<https://github.com/colinzuo/dddtdd-docs/blob/master/nginx_server/docker-compose.yml>

## Setup Nginx conf
<https://github.com/colinzuo/dddtdd-docs/blob/master/nginx_server/config/docserver.conf>
