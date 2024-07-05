---
title: INSTALLATION
---

## docker

[https://hub.docker.com/r/prom/prometheus/](https://hub.docker.com/r/prom/prometheus/)

[https://hub.docker.com/r/bitnami/prometheus](https://hub.docker.com/r/bitnami/prometheus)

```bash
# Create persistent volume for your data
docker volume create prometheus-data
# Start Prometheus container
docker run \
    -p 9090:9090 \
    -v /path/to/prometheus.yml:/etc/prometheus/prometheus.yml \
    -v prometheus-data:/prometheus \
    prom/prometheus
```

## helm

[https://github.com/prometheus-community/helm-charts](https://github.com/prometheus-community/helm-charts)
[https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus)

```yaml
alertmanager:
  enabled: false

kube-state-metrics:
  enabled: false

prometheus-node-exporter:
  enabled: false
  
prometheus-pushgateway:
  enabled: false
```
