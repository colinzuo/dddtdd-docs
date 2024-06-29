---
title: Configuration
---

<https://prometheus.io/docs/prometheus/latest/configuration/configuration/>

## relabel_config

Additional labels prefixed with `__meta_` may be available during the relabeling phase. They are set by the service discovery mechanism that provided the target and vary between mechanisms.

Labels starting with `__` will be removed from the label set after target relabeling is completed.


