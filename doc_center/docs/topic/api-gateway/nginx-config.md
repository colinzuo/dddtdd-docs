---
title: Nginx配置
---

类似本[文档网站配置](https://github.com/colinzuo/dddtdd-docs/blob/master/nginx_server/config/dddtdd.conf)

- 一部分是针对SPA提供静态文件的，参照下面dddtdd-docs对应配置
- 一部分是针对API提供反向代理的，参照下面dddtdd-api的对应配置，这里还配置了
websocket相关部分，因为后端很多时候会需要和前面保持一个websocket长连接

```
    location /dddtdd-docs/ {
        alias /srv/dddtdd-docs/;
        try_files $uri$args $uri$args/ /dddtdd-docs/index.html;
    }

    location /dddtdd-api/ {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_pass http://172.16.23.70:18080/dddtdd-api/;
        proxy_redirect off;
    }
```