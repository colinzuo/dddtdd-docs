---
title: 搭建ansible工程
---

## 变量优先级

参照[在哪里定义变量](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#variable-precedence-where-should-i-put-a-variable)

参照[变量是如何整合的](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html#how-we-merge)

参照[如何组织变量](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html#splitting-out-vars)

roles/x/defaults/main.yml这里是某个role的缺省变量配置，方便开箱即用

inventory/xxx/group_vars/all或者all/*下是针对所有主机的变量配置

inventory/xxx/group_vars/group_name或者group_name/*下是针对特定group的
变量配置，这个group_name比如在kubespray里有k8s-cluster，代表所有
k8s相关的主机节点，合理的分组可以使得每个配置文件不会太大，并且比较容易
找到想要的东西

:::tip
缺省同一级别group是按照字母表顺序覆盖的，但也可以通过设置ansible_group_priority来
明确指定优先级，这里我们给env_current明确配置ansible_group_priority从而使得
环境相关配置可以覆盖缺省group内的配置。
:::

```
  children:
    dddtdd-node:
      hosts:
        proxy:
    env-current:
      ansible_group_priority: 10
      hosts:
        proxy:
```

inventory/xxx/host_vars/host_name或者host_name/*下是针对特定host的变量配置，
不建议使用，因为希望在同一个分组下所有host是一致的，不一致会增加维护工作

另外在playbook里的roles中可以在每个role下对特定变量覆盖，这样可以很方便对
同一个role的不同变量赋值情况下执行，比如

```
roles:
   - role: app_user
     vars:
        myname: Ian
   - role: app_user
     vars:
       myname: Terry
   - role: app_user
     vars:
       myname: Graham
```

## 通过tag和变量控制执行

可以通过tag和变量来控制执行的部分，比如kubespray文档中给出的例子
```bash
ansible-playbook -i inventory/sample/hosts.ini cluster.yml \
    -e download_run_once=true -e download_localhost=true \
    --tags download --skip-tags upload,upgrade
```

## Ansible facts

[官方文档](https://docs.ansible.com/ansible/latest/user_guide/playbooks_vars_facts.html)

Ansible facts就是一些关于你的目标机的信息，比如操作系统，IP地址，文件系统等。

如官方文档所述，可以通过下面命令查看
```bash
# hostname为inventory文件中指定的主机名或ip地址
ansible <hostname> -b -u root -i inventory -m ansible.builtin.setup
```

部分输出截取如下
```json
{
    "ansible_facts": {
        "ansible_all_ipv4_addresses": [
            "********"
        ],
        "ansible_architecture": "x86_64",
        "ansible_date_time": {
            "date": "2020-12-04",
            "day": "04",
            "epoch": "1607045592",
            "hour": "01",
            "iso8601": "2020-12-04T01:33:12Z",
            "iso8601_basic": "20201204T013312047653",
            "iso8601_basic_short": "20201204T013312",
            "iso8601_micro": "2020-12-04T01:33:12.047653Z",
            "minute": "33",
            "month": "12",
            "second": "12",
            "time": "01:33:12",
            "tz": "UTC",
            "tz_offset": "+0000",
            "weekday": "Friday",
            "weekday_number": "5",
            "weeknumber": "48",
            "year": "2020"
        },
        "ansible_default_ipv4": {
            "address": "********",
        },
        "ansible_distribution": "Ubuntu",
        "ansible_distribution_major_version": "18",
        "ansible_distribution_release": "bionic",
        "ansible_distribution_version": "18.04",
        "ansible_kernel": "4.15.0-126-generic",
        "ansible_nodename": "********",
        "ansible_os_family": "Debian",
        "ansible_pkg_mgr": "apt",
        "ansible_python_version": "2.7.17",
    }
}
```

## 主要ansible role

[dddtdd-deploy](https://github.com/colinzuo/dddtdd-deploy)

- adduser:  添加用户
- bootstrap-os: 安装python3，不过ubuntu 18已经自带了
- dddtdd/preinstall:  安装系统包
- container-engine/docker: 安装docker
- download: 下载container image和file，可以配置通过一个机器下载然后分发到所有机器
