---
title: 编译
---

首先按照介绍中下载和安装。

## go module介绍
[module-cache](https://golang.org/ref/mod#module-cache)

## 具体编译
只需要调用go build就好，命令会自动触发依赖下载，依赖会下载到
$GOPATH/pkg/mod
```bash
go build

go: downloading github.com/spf13/viper v1.7.1
go: downloading github.com/mitchellh/go-homedir v1.0.0
go: downloading go.uber.org/zap v1.16.0
go: downloading github.com/spf13/pflag v1.0.5
go: downloading github.com/pkg/errors v0.9.1
```