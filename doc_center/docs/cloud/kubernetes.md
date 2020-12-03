---
title: Kubernetes
---

## Install and Set Up kubectl
<https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl>

```bash
sudo apt-get update && sudo apt-get install -y apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl

kubectl completion bash >/etc/bash_completion.d/kubectl
```

## kubectl usage

### Resource Reservation
```bash
kubectl describe nodes

kubectl get po --all-namespaces -o=jsonpath="{range .items[*]}{.metadata.namespace}:{.metadata.name}{'\n'}{range .spec.containers[*]}  {.name}:{.resources.requests.cpu}{'\n'}{end}{'\n'}{end}"
```
