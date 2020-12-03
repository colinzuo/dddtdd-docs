---
title: 搭建Ubuntu基本环境
---

个人用的比较多的服务器系统有CentOS，Ubuntu，Fedora等，后期因为tensorflow，
kubernetes之类的文档里的例子都是基于ubuntu的，所以个人也转为专注使用Ubuntu。

为了方便迁移，除了初始的系统安装，ip设置，后面的软件安装设置等都尽量
走ansible。

## 系统版本

建议安装Ubuntu 18.04，不建议ubuntu 16.04的原因是它的内核版本(4.4)有些老，之前使用过程中偶现kernel panic，换到ubuntu 18.04(内核4.15)后未碰到

## Ubuntu 18.04安装

### 安装系统
+ 配置静态ip
命令行方式下可以通过修改/etc/netplan/目录下文件实现
```bash
network:
    ethernets:
        ens160:
            addresses:
            - 172.16.xx.xx/24
            gateway4: 172.16.xx.254
            nameservers:
                addresses:
                - xx.xx.xx.xx
                - xx.xx.xx.xx

sudo netplan apply
```
+ 安装openssh-server, vim
```bash
sudo apt-get install -y openssh-server vim
```
+ 切换编辑器到vim
```bash
sudo update-alternatives --config editor
```
+  [使能root登录](https://askubuntu.com/questions/469143/how-to-enable-ssh-root-access-on-ubuntu-14-04)
```
# /etc/ssh/sshd_config
PermitRootLogin yes

# reload sshd
service sshd reload

# set passwd
passwd
```
+ [同步时间](https://vitux.com/how-to-install-ntp-server-and-client-on-ubuntu/)
```bash
sudo apt-get install -y ntp
```

### 更换apt源
参照[Ubuntu 18.04 LTS 更换国内源](https://zhuanlan.zhihu.com/p/61228593)

```
# 首先备份源列表
sudo cp /etc/apt/sources.list /etc/apt/sources.list_backup

# 打开sources.list文件
sudo vim /etc/apt/sources.list

# 编辑/etc/apt/sources.list文件, 在文件最前面添加阿里云镜像源

#  阿里源
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse

# 刷新列表
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install build-essential
```