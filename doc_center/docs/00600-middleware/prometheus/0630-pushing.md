---
title: When to use the Pushgateway
---

- The Pushgateway **never forgets** series pushed to it and will expose them to Prometheus forever unless those series are manually deleted via the Pushgateway's API

Prometheus's usual pull-style monitoring: when an instance disappears (intentional or not), its metrics will automatically disappear along with it. When using the Pushgateway, this is not the case, and you would now have to delete any stale metrics manually or automate this lifecycle synchronization yourself


