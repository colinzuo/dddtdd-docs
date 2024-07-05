---
title: Docker
---

## Follow Kubernetes 
[https://kubernetes.io/docs/setup/production-environment/container-runtimes/#docker](https://kubernetes.io/docs/setup/production-environment/container-runtimes/#docker)

## Rancher Requirement
[Manage Docker as a non-root user](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user), needed by [Rancher][], as said in [ssh-connectivity-errors](https://rancher.com/docs/rke/latest/en/troubleshooting/ssh-connectivity-errors/)

## Install docker-compose
https://docs.docker.com/compose/install/

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

[Rancher]: https://rancher.com/