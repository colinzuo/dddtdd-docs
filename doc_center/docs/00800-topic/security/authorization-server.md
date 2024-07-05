---
title: 认证服务器
---

## cloudfoundry的uaa

[uaa cloudfoundry doc](https://docs.cloudfoundry.org/concepts/architecture/uaa.html)  
[uaa github repo](https://github.com/cloudfoundry/uaa)

uaa是认证服务器，本身提供很简单的web ui，这个文档提到可以在外部的login应用里
提供更复杂的web ui，比如包括注册，登录等功能。

文档中的scope是通过符号点来区分不同层级的，比如scim.write，cloud_controller.write

### uaa使用示例

https://www.baeldung.com/cloud-foundry-uaa
