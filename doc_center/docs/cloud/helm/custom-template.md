---
title: 定制模板
---

## 定制升级策略

首先在模板文件，比如deployment文件中检查并使用对应变量，比如

```
spec:
  {{- with .Values.strategy }}
  strategy:
    {{- toYaml . | nindent 4 }}
  {{- end }}
```

然后在value文件中定义缺省值，比如

```
strategy:
  type: Recreate
```
