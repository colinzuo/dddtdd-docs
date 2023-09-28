---
title: Examples
---

## Simple time series selection

```r
http_requests_total

http_requests_total{job="apiserver", handler="/api/comments"}

http_requests_total{job="apiserver", handler="/api/comments"}[5m]

http_requests_total{job=~".*server"}

http_requests_total{status!~"4.."}
```

## Subquery

```r
rate(http_requests_total[5m])[30m:1m]

max_over_time(deriv(rate(distance_covered_total[5s])[30s:5s])[10m:])
```

## Using functions, operators, etc

```r
rate(http_requests_total[5m])

sum by (job) (
  rate(http_requests_total[5m])
)

(instance_memory_limit_bytes - instance_memory_usage_bytes) / 1024 / 1024

sum by (app, proc) (
  instance_memory_limit_bytes - instance_memory_usage_bytes
) / 1024 / 1024

topk(3, sum by (app, proc) (rate(instance_cpu_time_ns[5m])))

count by (app) (instance_cpu_time_ns)
```
