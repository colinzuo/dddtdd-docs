---
title: 调试
---

## pod起不来

如果pod起不来，我们可以通过更改command来只是简单的循环sleep让pod进入
running状态，然后再进入pod看具体原因。

```
      - args:
        - -c
        - while true; do echo hello; sleep 10;done
        command:
        - /bin/bash
```