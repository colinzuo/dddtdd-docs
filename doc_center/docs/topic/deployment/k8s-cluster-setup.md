---
title: 使用kubeadm安装k8s集群
---

[kubeadm HA模式安装官方文档](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/)

## 安装基于haproxy的load balancer
[参考文档](https://www.jordyverbeek.nl/nieuws/kubernetes-ha-cluster-installation-guide)
``` bash
sudo apt install -y keepalived haproxy

# edit, update, restart keepalived
# misc/kubeadm/keepalived.conf
sudo cp keepalived.conf /etc/keepalived/
sudo systemctl restart keepalived

# edit, ,update, restart haproxy
# misc/kubeadm/haproxy.cfg
sudo cp haproxy.cfg /etc/haproxy/
sudo systemctl restart haproxy
```
参考keepalived.conf配置文件见harix-deploy/misc/kubeadm/keepalived.conf，当前版本如下，不同环境的virtual_router_id需要不一样，同一个环境的不同机器的priority应该不一样
```
vrrp_instance VI_1 {
    state MASTER
    interface ens160
    virtual_router_id 161
    priority 101
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    unicast_peer {
        172.16.23.55
        172.16.23.56
        172.16.23.57
    }
    virtual_ipaddress {
        172.16.23.61
    }
}
```
参考haproxy.cfg配置文件见harix-deploy/misc/kubeadm/haproxy.cfg
## 关闭swap
[参考文档](https://serverfault.com/questions/684771/best-way-to-disable-swap-in-linux)
## 安装docker-ce
[参考文档](https://kubernetes.io/docs/setup/production-environment/container-runtimes/)
## 安装kubelet kubeadm kubectl
[参考文档](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
## 安装kubectl bash completion
[参考文档](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
``` bash
kubectl completion bash >/etc/bash_completion.d/kubectl
```

## 修改/etc/hosts
首先设置机器的hosts文件，一个是load balancer地址，比如下面23.60是前面lb上配置的vip地址，一个是harbor的地址比如下面的13.133
```
# edit /etc/hosts, such as
172.16.23.60  harix45lb
172.16.13.133 harbor.cloudminds.com
```
## 准备kubeadm-config.yaml
然后准备kubeadm-config.yaml文件，参考见misc/kubeadm/kubeadm-config.yaml，当前版本内容如下 (用于61环境，其它环境至少应改lb地址)
```
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
kubernetesVersion: stable
controlPlaneEndpoint: "harix45lb:443"
networking:
  podSubnet: 10.222.0.0/16
```
## 调用kubeadm在第一个master上安装
``` bash
kubeadm init --config=kubeadm-config.yaml --upload-certs
```
## 安装calico
下载https://docs.projectcalico.org/v3.8/manifests/calico.yaml并按照前面kubeadm-config.yaml文件修改CALICO_IPV4POOL_CIDR，可对照misc/kubeadm/calico.yaml
``` bash
kubectl apply -f calico.yaml
```
## 在另外设计为master的机器上用kubeadm加入
kubeadm init结尾会给join需要执行的命令
``` bash
kubeadm join harix45lb:443 --token io7jk5.ndanb8hbe7cpn1q2 \
    --discovery-token-ca-cert-hash sha256:9eb562b0cabe93c48f6cb5e074ddcaa226d038d4fb201b6e49145267485d7296
```
## 安装k8s Dashboard
[参考文档](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)
``` bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta1/aio/deploy/recommended.yaml
```
参照kubespray实现，可apply misc/dashboard/dashboard-api.yaml来允许集群外访问api从而访问dashboard
``` bash
kubectl apply -f dashboard-api.yaml
```

## 加入worker节点
[参考文档](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-join/)
``` bash
kubeadm token create --print-join-command
```

## 安装必要软件
``` bash
sudo apt-get install -y python nfs-common
```

## 在master上使用keepalived配置VIP做业务HA
因为在业务系统经常需要配一个外部访问地址，如果配某台node的固定ip的话如果这台
机器宕机了外部访问就会中断，在没有专门load balancer设备的情况下，可以使用keepalived配置VIP来实现HA\
[参考文档](https://tecadmin.net/setup-ip-failover-on-ubuntu-with-keepalived/)\
[注意issue](https://github.com/acassen/keepalived/issues/836)，可以通过下载最新keepalived源码编译然后替换系统里的keepalived程序更新
``` bash
cd /usr/sbin/
mv keepalived keepalived.bak
scp colinzuo@172.16.23.53:/usr/local/sbin/keepalived .
systemctl restart keepalived.service
ip addr del 172.16.23.60/32 dev ens160;ip addr
```
同时可参考前面[安装基于haproxy的load-balancer](#安装基于haproxy的load-balancer)中的keepalived部分


## 拆除k8s集群(重装或安装遇到问题时)
[参考文档](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)
