# Install Rancher

[kubernetes]: https://kubernetes.io/
[KubeSphere]: https://kubesphere.io/en/
[Rancher]: https://rancher.com/
[Rancher-quickstart-manual-setup]: https://rancher.com/docs/rancher/v2.x/en/quick-start-guide/deployment/quickstart-manual-setup/

The following section teaches you how to setup [Rancher].

## Introduction
We will use [kubernetes] to orchestrate the docker containers.
To manage kuernete clusters, there are free tools like [Rancher], [KubeSphere], and we choose [Rancher].

## How to Install Docker
[Setup Docker](./docker.md)

## Install Rancher

### Setup VM such as GCE
[Setup GCE](./gcloud.md)

### Install and Set Up kubectl
[Install and Set Up kubectl](./kubernetes.md)

### Install RKE
https://rancher.com/docs/rke/latest/en/installation/

[BackupConfig](https://rancher.com/docs/rancher/v2.x/en/backups/backups/ha-backups/)

Sample cluster.yml
```
nodes:
    - address: 10.128.0.2
      user: colinzuo
      role: [controlplane, worker, etcd]

services:
  etcd:
    backup_config:
      enabled: true     # enables recurring etcd snapshots
      interval_hours: 6 # time increment between snapshots
      retention: 7     # time in days before snapshot purge

# Required for external TLS termination with
# ingress-nginx v0.22+
ingress:
  provider: nginx
  options:
    use-forwarded-headers: "true"
```

```bash
rke up
```

### Config kubectl config
```
mkdir -p ~/.kube
cp kube_config_cluster.yml ~/.kube/rancher_config
# edit ~/.profile
export KUBECONFIG=$HOME/.kube/rancher_config
```

### Install Helm
[Install Helm](./helm.md)

### Install Rancher Itself
```
helm repo add rancher-stable https://releases.rancher.com/server-charts/stable

kubectl apply -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.12/deploy/manifests/00-crds.yaml

kubectl create namespace cert-manager

helm repo add jetstack https://charts.jetstack.io

helm repo update

helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --version v0.12.0

kubectl get pods --namespace cert-manager

helm install rancher rancher-stable/rancher \
  --namespace cattle-system \
  --set hostname=ranchercz1.myorg.com

kubectl -n cattle-system rollout status deploy/rancher
```

### Modify hosts file to add hostname entry for Web Client
such as for windows

```
10.128.0.2 ranchercz1.myorg.com
```

### Create RKE template
as needed

### Create Cluster
take GKE for ex

+ Enable Identity and Access Management (IAM) API
https://console.developers.google.com/apis/api/iam.googleapis.com/overview?project=PROJECT_ID
+ Enable Kubernetes Engine API
https://console.developers.google.com/apis/api/container.googleapis.com/overview?project=731260793637
+ Create a Service Account with roles
  - Compute Viewer
  - Project Viewer
  - Kubernetes Engine Admin
  - Service Account User

### Modify cattle-cluster-agent to add host-aliases
https://kubernetes.io/docs/concepts/services-networking/add-entries-to-pod-etc-hosts-with-host-aliases/
```
      - hostnames:
        - ranchercz1.myorg.com
        ip: 10.128.0.2
```

### Modify hosts file to add hostname entry for k8s Nodes
/etc/hosts

```
10.128.0.2 ranchercz1.myorg.com
```

### Resource Reservation
```
kubectl describe nodes

kubectl get po --all-namespaces -o=jsonpath="{range .items[*]}{.metadata.namespace}:{.metadata.name}{'\n'}{range .spec.containers[*]}  {.name}:{.resources.requests.cpu}{'\n'}{end}{'\n'}{end}"
```
