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

