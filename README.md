# DDDTDD Docs

## 基于Docusaurus生成静态文档网站
目录doc_center是一个基于Docusaurus生成的文档工程，具体信息可以看目录内README。

## Nginx服务器
生成的文档网站使用Nginx来提供访问，Nginx通过docker-compose来搭建

### docker-compose配置文件说明
这里缺省只配置https端口，如果也同时开放http端口，可以把80端口也映射上，
要注意的是外部主机和docker container端口需要保持一致，否则的话当nginx
在container里通过redirect重定向时会导致端口改变而用错地址。

```
  ports:
    - 443:443
```

主机目录mount到container中的配置，其中
- root目录主要是在nginx配置中打开auto index，
    然后在里面创建一些符号链接来指向不同的静态网站，比如dddtdd-docs来指向本文档网站，
    也可以服务一些业务网站，比如SPA应用。
- config目录是nginx的配置文件，例子中的dddtdd-docs是对文档网站的参考配置，dddtdd-api是对
    后端rest api服务的参考配置，对根目录就是配置了auto index，如果对home页面没有特殊要求就
    可以这么提供一个简单的链接页面
- cert是对https所用证书的指定目录
- dddtdd-docs是本项目文档对应目录

```
  volumes:
    - ./root:/usr/share/nginx/html
    - ./config:/etc/nginx/conf.d
    - /srv/cert:/srv/cert
    - /srv/docs_server:/srv/docs_server 
```

### 生成ssl用的自签名证书

参考[how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-18-04](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-18-04)

### 启动停止

参考命令如下，具体可以参考docker-compose官方文档
```
sudo docker-compose up -d
sudo docker-compose down
```
