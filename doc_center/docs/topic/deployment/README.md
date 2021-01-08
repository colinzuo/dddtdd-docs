---
title: 部署介绍
slug: /topic/deployment/
---

VM本身的创建应该基于terraform，不过个人没有机会尝试，从一些培训视频感觉应该用它，基本意思就是指定cpu，内存，硬盘等配置后，这个工具就能自动创建对应配置的VM，应该类似Vmware
的那一套，当需要在不同区域部署时，这种自动化的比手动的可靠很多，比如在一个国家开发稳定后，通过这个在另一个国家部署。

自己基于服务器搭建VM可以使用Vmware的Vsphere，VM虽然会有少量资源消耗，但是带来的好处更多，不同的VM通过vsphere可以很好的隔离，VM还比较容易做snapshot，做实验，重装之类的都比较方便。

裸机或者VM部署采用ansible，基本意思就是通过ssh登录到远端机器，然后用ansible的不同module做部署，对于特定需求也可以自己编写脚本，然后通过ansible首先把脚本同步到目标机，然后再执行对应脚本。

kubernetes中部署采用helm，初始的部署可以通过ansible调用helm，部署具体模块时推荐使用
operator模式的从而降低人工运维的工作。

## 培训视频

[Highly Available and Resilient Multi-Site Deployments Using Spinnaker](https://www.youtube.com/watch?v=-gkt_Ch-qb0)
