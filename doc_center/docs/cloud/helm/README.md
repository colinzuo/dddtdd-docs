---
title: Helm介绍
slug: /cloud/helm/
---

## Install Helm
<https://helm.sh/docs/intro/install/>

```bash
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```

## 初始化Chart仓库

```bash
helm repo add stable https://charts.helm.sh/stable

helm search repo mysql

helm search hub mysql
```

## 官方文档

- [Home](https://helm.sh/docs/)
- [快速上手](https://helm.sh/docs/intro/quickstart/)
- [使用helm](https://helm.sh/docs/intro/using_helm/)
- [Charts开发要点](https://helm.sh/docs/howto/charts_tips_and_tricks/)

## 创建Chart

```bash
helm create deis-workflow

helm package deis-workflow

helm install deis-workflow ./deis-workflow-0.1.0.tgz
```

## 常用命令

```bash
helm install -f config.yaml stable/mariadb --generate-name

helm upgrade -f panda.yaml happy-panda stable/mariadb

helm get values happy-panda

# helm rollback [RELEASE] [REVISION]
# helm history [RELEASE]
helm rollback happy-panda 1

helm uninstall happy-panda

helm list

helm repo list
```
