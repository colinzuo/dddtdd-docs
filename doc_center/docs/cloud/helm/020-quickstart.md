
`https://helm.sh/docs/intro/quickstart/`

## install

`https://helm.sh/docs/intro/install/`

```bash
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```

## Initialize a Helm Chart Repository

类似于ubuntu的`apt`系统，可以添加`chart repository`

`helm repo add bitnami https://charts.bitnami.com/bitnami`

## Install an Example Chart

```bash
helm repo update 

helm install bitnami/mysql --generate-name
```

## Learn About Releases

```bash
helm list
```

## Uninstall a Release

```bash
helm status mysql-1612624192

helm uninstall mysql-1612624192
```


