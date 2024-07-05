---
title: Template examples
---

[https://prometheus.io/docs/prometheus/latest/configuration/template_examples/](https://prometheus.io/docs/prometheus/latest/configuration/template_examples/)

## Simple alert field templates

```text
alert: InstanceDown
expr: up == 0
for: 5m
labels:
  severity: page
annotations:
  summary: "Instance {{$labels.instance}} down"
  description: "{{$labels.instance}} of job {{$labels.job}} has been down for more than 5 minutes."
```

Alert field templates will be executed during every rule iteration for each alert that fires, so keep any queries and templates lightweight

## Simple iteration

```text
{{ range query "up" }}
  {{ .Labels.instance }} {{ .Value }}
{{ end }}
```

## Display one value

```text
{{ with query "some_metric{instance='someinstance'}" }}
  {{ . | first | value | humanize }}
{{ end }}
```


