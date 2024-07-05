---
title: SubModules
---

一个大项目可能包括多个小项目，每个小项目有自己的仓库，可以在大项目
中通过submodule来聚合小项目。

## 添加submodule

```bash
git submodule add https://github.com/chaconinc/DbConnector

#设置branch，缺省为master  
git config -f .gitmodules submodule.DbConnector.branch stable
```

## 下载submodule

```bash
git submodule init
git submodule update

# or

git submodule update --init
```

## 更新submodule

```bash
git submodule update --remote --rebase

# or

git pull --recurse-submodules
```

## 修改submodule

```bash
cd {submodule dir}
git checkout master
git add xxxx
git commit
git push

# 从主项目push

# git push --recurse-submodules=check
git push --recurse-submodules=on-demand 

# or

# git config push.recurseSubmodules check
git config push.recurseSubmodules on-demand
git push

```

## python
[https://shunsvineyard.info/2019/12/23/using-git-submodule-and-develop-mode-to-manage-python-projects/](https://shunsvineyard.info/2019/12/23/using-git-submodule-and-develop-mode-to-manage-python-projects/)

## 参考文档

[https://git-scm.com/book/en/v2/Git-Tools-Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)  
