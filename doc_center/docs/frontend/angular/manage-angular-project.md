---
title: 管理Angular工程
---

```bash
ng generate module core
ng generate module features/login
ng generate module features/main
ng generate @angular/material:address-form -m main features/login/login
ng generate @angular/material:nav -m main features/main/main

ng generate component -m features/main features/main/components/test-suite
```