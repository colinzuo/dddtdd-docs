---
title: Elk
---

## Fork github docker-elk
<https://github.com/deviantony/docker-elk>

## Create a branch
```bash
git checkout -b autotest
git push --set-upstream origin autotest
```

## Modify Settings

### docker-compose.yml

+ elasticsearch
```
-      - type: volume
-        source: elasticsearch
+      - type: bind
+        source: /srv/elk/elasticsearch

-      ES_JAVA_OPTS: "-Xmx256m -Xms256m"
+      ES_JAVA_OPTS: "-Xmx2048m -Xms2048m"

-volumes:
-  elasticsearch:
```

+ logstash
```
+      - "5044:5044/tcp"
+      - "5044:5044/udp"

-      LS_JAVA_OPTS: "-Xmx256m -Xms256m"
+      LS_JAVA_OPTS: "-Xmx2048m -Xms2048m"
```

### elasticsearch/config/elasticsearch.yml
```
-xpack.license.self_generated.type: trial
+xpack.license.self_generated.type: basic
```

### prepare images
<https://github.com/colinzuo/kubernetes>

pull from docker.elastic.co

push to private registry

login to private registry

### prepare directories
```bash
mkdir -p /srv/elk/elasticsearch
chown 1000:1000 /srv/elk/elasticsearch
```

### startup containers
```bash
docker-compose up -d
```

### setting-up-user-authentication
<https://github.com/deviantony/docker-elk#setting-up-user-authentication>

### Setup Filebeat
<https://github.com/colinzuo/beats>

+ Load Template
```bash
export   ELASTICSEARCH_HOSTS=172.16.23.70:9200
export ELASTICSEARCH_USERNAME=elastic
export ELASTICSEARCH_PASSWORD=ezhTRZKhX2ItULXy1tXd

./filebeat -c filebeat.yml.orig setup --index-management -E output.logstash.enabled=false
```

+ Create Configuration file
[Sample Configuration](../files/filebeat_auto_portal.yml.md)

+ Start filebeat
```bash
nohup ./filebeat -c filebeat_auto_portal.yml > start_filebeat_log.txt 2>&1 &
```

### Setup Index Patterns on Kibana
such as
+ filebeat-autotest-audit-*
+ filebeat-autotest-norm-*
+ logstash-*

### Save Popular Search