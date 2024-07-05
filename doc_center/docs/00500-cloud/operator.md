---
title: Operator
---

[introducing-operators](https://coreos.com/blog/introducing-operators.html)

It builds upon the basic Kubernetes resource and controller concepts but includes domain or application-specific knowledge to automate common tasks

Stateless is Easy, Stateful is Hard

kubernetes本身的功能管理无状态的应用是没问题的，但对于有状态的，比如
数据库，智能scale就不行了。

如果人工来做这些事，会很费时间，容易出错，无法简单scale到比如多集群，而
operator就可以用来做对应的自动化运维的工作，比如redis集群的管理，
管理主从切换和通过更新label让master service匹配到对应的pod等。

## Operator pattern
[Operator pattern](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/)


## Links
[operatorhub](https://operatorhub.io/)

[best-practices-for-building-kubernetes-operators-and-stateful-apps](https://cloud.google.com/blog/products/containers-kubernetes/best-practices-for-building-kubernetes-operators-and-stateful-apps)

[operator-framework](https://github.com/operator-framework/getting-started)

[operator-sdk](https://github.com/operator-framework/operator-sdk)

[kubebuilder](https://github.com/kubernetes-sigs/kubebuilder)
