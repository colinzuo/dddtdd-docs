
`https://helm.sh/docs/intro/using_helm/`

## Installing a Package

it takes two arguments: A **release name** that you pick, and the name of the chart you want to install

```bash
helm install happy-panda bitnami/wordpress

helm status happy-panda
```

Helm installs resources in the following order

- Namespace
- ServiceAccount
- Secret
- ConfigMap
- PersistentVolume
- PersistentVolumeClaim
- Service
- Deployment
- StatefulSet

## Customizing the Chart Before Installing

```bash
# helm install <name> <chart> --dry-run --debug         # Run a test installation to validate chart (p)
helm install -f values.yaml bitnami/wordpress --generate-name

helm get values release-name

# see the entire generated YAML
helm get manifest release-name
```

## Upgrading a Release, and Recovering on Failure

```bash
helm upgrade -f panda.yaml happy-panda bitnami/wordpres

helm get values release-name

# helm rollback [RELEASE] [REVISION]
helm rollback happy-panda 1
```

## Uninstalling a Release

```bash
helm uninstall happy-panda

helm list
```

## Working with Repositories

```bash
helm repo list

helm repo add dev https://example.com/dev-charts
```

## Creating Your Own Charts

```bash
helm create deis-workflow

helm lint
```
