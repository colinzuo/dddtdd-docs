---
sidebar_position: 9
---

## DefaultClientResources lettuceClientResources

配置线程资源，tracing等

## LettuceConnectionFactory redisConnectionFactory

创建LettuceClientConfiguration，配置SSL, connectTimeout, commandTimeout,
ClientName, Cluster Refresh, PoolConfig(比如MaxActive，MaxIdle等)

组合SentinelConfig, ClusterConfiguration或StandaloneConfig，和
LettuceClientConfiguration生成LettuceConnectionFactory
