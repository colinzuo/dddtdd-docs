# 介绍

## Force Update

当从maven repo中下载失败时，缺省maven可能会等很长时间才会再次尝试下载，这个
时候可以通过-U命令强制下载

```
mvn clean install -U -X
```

[force-maven-to-fetch-dependencies-from-remote](https://medium.com/@TechExpertise/force-maven-to-fetch-dependencies-from-remote-f8d44b80a37d)
