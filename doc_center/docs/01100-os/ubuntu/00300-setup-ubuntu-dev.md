---
title: 搭建ubuntu开发服务器环境
---

## ansible配置
+ 安装python3  
python3本身ubuntu18自带，只需安装python3-pip
```bash
sudo apt install python3-pip
```
+ 安装ansible和jinja2  
首先设置镜像地址，否则在国内安装特别慢，参考[setup pip mirror in China](https://gist.github.com/schnell18/d0ed716917905d2c142a370906cfa32f)
```bash
mkdir ~/.pip
cat <<EOF > ~/.pip/pip.conf
 [global]
 index-url = https://mirrors.aliyun.com/pypi/simple/
EOF

pip3 install ansible jinja2
```

## kubectl配置
+ [安装kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
+ 配置k8s集群访问所需kubectl的config文件
```
# .profile
export KUBECONFIG=$HOME/.kube/config_aaa:$HOME/.kube/config_bbb

xxx:~/.kube$ ls
config_aaa  config_bbb
```
参考配置文件config_aaa如下
```
apiVersion: v1
clusters:
- cluster:
    insecure-skip-tls-verify: true
    server: https://172.16.xx.xx:6443
  name: cluster.aaa
contexts:
- context:
    cluster: cluster.aaa
    user: admin-aaa
  name: admin-aaa@cluster.aaa
current-context: admin-aaa@cluster.aaa
kind: Config
preferences: {}
users:
- name: admin-aaa
  user:
    token: *****************
```