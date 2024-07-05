
## 产品

### Amazon API Gateway

[https://aws.amazon.com/api-gateway/](https://aws.amazon.com/api-gateway/)

主要功能包括:
- 多版本API
- 监控：调用次数，延迟，错误率等，Amazon CloudWatch
- 限流：throttle
- 认证：authentication和authorization，比如基于OAuth2
- 缓存：API Gateway Cache

### AWS CloudFormation

[https://aws.amazon.com/cloudformation/](https://aws.amazon.com/cloudformation/)

Infrastructure as code，也就是基础设施用代码来描述，比如
虚拟机的配置，像是cpu核数，内存大小等，这样可以很容易的以
自动化手段创建一个集群

这样当因为各种需求，比如测试，比如在新国家地区，演示等原因需要
部署时可以很容易创建，当不需要时也可以很容易删除。

### AWS Identity and Access Management

[https://aws.amazon.com/iam/](https://aws.amazon.com/iam/)

身份和权限管理，支持同Microsoft Active Directory等对接。

### Amazon S3

[https://aws.amazon.com/s3/](https://aws.amazon.com/s3/)

对象存储服务，开源版本的有[ceph](https://github.com/ceph/ceph)，[minio](https://github.com/minio/minio)等
