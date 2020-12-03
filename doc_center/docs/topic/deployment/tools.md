---
title: 部署相关工具
---

## Dell idrac
Dell服务器控制台，可用来安装系统，比如通过iso文件安装VSphere
:::warning
使用ie访问控制台的virtual console，使用chrome或者edge的话可能会因为java连接鉴权的原因而失败
:::
[使用iDRAC 6、7、8和9上的虚拟介质功能](https://www.dell.com/support/article/cn/zh/cnbsd1/sln296648/%E4%BD%BF%E7%94%A8idrac-6-7-8%E5%92%8C9%E4%B8%8A%E7%9A%84%E8%99%9A%E6%8B%9F%E4%BB%8B%E8%B4%A8%E5%8A%9F%E8%83%BD?lang=zh#iDRAC8)


## vSphere Hypervisor
[vSphere Hypervisor][]可用来在一台物理机上安装多台虚拟机，一个是可以让这些虚拟机共享资源，一个是可以隔离这些虚拟机，一台虚拟机崩溃不会影响其他机器，一台虚拟机如果有程序非正常抢占资源也只会最多占用配置的资源

k8s中使用linux cgroup来控制，但是VM这种更简单，初期使用这种应该更可行  
[安装介绍视频](https://players.brightcove.net/1534342432001/Byh3doRJx_default/index.html?videoId=2011162514001)
安装完成后可安装vmware的open-vm-tools工具来增强vm表现
```bash
sudo apt-get update
# for Ubuntu server
sudo apt install open-vm-tools
# for Ubuntu desktop
sudo apt install open-vm-tools-desktop
```

## Kubespray
[kubespray github](https://github.com/kubernetes-sigs/kubespray)  
[kubespray official](https://kubespray.io/#/)  

[Kubespray][]本身是用来安装k8s集群的，但个人并不建议使用这个安装k8s集群，安装k8s
直接使用官方的kubeadm就好，那个已经很简单了。

这里提到这个主要是参考它对ansible的用法，比如对操作系统的配置。

## Ansible
[ansible](https://docs.ansible.com/)是一个很流行的运维工具，可以很方便管理多台机器，它里面有很多模块，各负责不同功能，比如有的模块负责拷贝文件，有的负责软件管理等。

## Docker
[docker ubuntu 安装](https://docs.docker.com/install/linux/docker-ce/ubuntu)
官方的会比较新，在k8s中很可能会有问题，用在k8s中建议按照k8s官方建议安装，比如
[k8s docker建议安装](https://kubernetes.io/docs/setup/production-environment/container-runtimes/)

## Kubernetes
[kubernetes](https://kubernetes.io/)是一个容器集群管理工具，少到一台机器，多到几百台机器都可以管理，每台机器会按照调度规则调度一些pod运行，每个pod里会有若干个容器
+ [安装kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
+ [使用kubeadm升级kubernets集群](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/)
+ [使用kubeadm创建集群](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)


[Kubespray]: https://github.com/kubernetes-sigs/kubespray
[vSphere Hypervisor]: https://www.vmware.com/products/vsphere-hypervisor.html
