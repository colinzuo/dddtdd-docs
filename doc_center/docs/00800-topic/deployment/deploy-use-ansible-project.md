---
title: 使用ansible工程部署
---

## 创建并配置host文件

可参考inventory/dddtdd/hosts_dddtdd.yml，这个是用于ssh登录到目标机然后
部署的

可参考inventory/dddtdd/hosts_proxy.yml，这个是在往k8s环境中部署时在本地
通过kubectl来部署用的，有时候只有k8s的config，没有ssh登录信息，这时候只能
这么部署

## 创建环境相关目录，并按需更新符号链接env-current

比如创建inventory/dddtdd/group_vars/env_abc，然后在inventory/dddtdd/group_vars
目录下创建符号链接，使得env-current指向env_abc，因为在hosts_proxy.yml中已经指定
了env-current分组优先级高于一般分组，所以可以做到覆盖一般分组的变量

## 创建需要的ansible playbook并执行

比如
```bash
ansible-playbook -i inventory/dddtdd/hosts_23_54.yml -vvv dddtdd-base.yml
```