---
title: Prometheus介绍
slug: /middleware/prometheus/
---

[官方文档](https://prometheus.io/docs/introduction/overview/)

## Metric类型

<https://prometheus.io/docs/concepts/metric_types/>

## 配置文件示例

sd(service discovery)服务发现配置讲的是如果通过服务发现来发现
需要抓取的服务信息，比如地址，instance id等。

### file_sd_config
<https://prometheus.io/docs/prometheus/latest/configuration/configuration/#file_sd_config>

### kubernetes_sd_config
<https://github.com/prometheus/prometheus/blob/release-2.23/documentation/examples/prometheus-kubernetes.yml>

### eureka_sd_config
<https://prometheus.io/docs/prometheus/latest/configuration/configuration/#eureka_sd_config>
<https://github.com/prometheus/prometheus/blob/release-2.23/documentation/examples/prometheus-eureka.yml>

### relabel_config
relabel讲如何对label做处理，比如对原来label改变名字，改变值，扔掉特定label，
保留特定label等等，总之就是不同sd_config会提供不同的meta数据和label，然后可以
通过relabel来选择如何生成最终关心的label name和label value。

<https://prometheus.io/docs/prometheus/latest/configuration/configuration/#relabel_config>

## Prometheus Operator
<https://github.com/prometheus-operator/prometheus-operator>
