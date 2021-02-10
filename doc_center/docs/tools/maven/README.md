---
title: Maven介绍
slug: /tools/maven/
---

## Force Update

当从maven repo中下载失败时，缺省maven可能会等很长时间才会再次尝试下载，这个
时候可以通过-U命令强制下载

```
mvn clean install -U -X
```

[force-maven-to-fetch-dependencies-from-remote](https://medium.com/@TechExpertise/force-maven-to-fetch-dependencies-from-remote-f8d44b80a37d)

## snapshot setting

<https://maven.apache.org/settings.html#Repositories>

- releases, snapshots: These are the policies for each type of artifact, Release or snapshot. With these two sets, a POM has the power to alter the policies for each type independent of the other within a single repository. For example, one may decide to enable only snapshot downloads, possibly for development purposes.
- enabled: true or false for whether this repository is enabled for the respective type (releases or snapshots).

## 查看活跃profile

mvn help:active-profiles

