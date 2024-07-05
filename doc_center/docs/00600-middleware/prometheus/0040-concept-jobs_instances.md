---
title: JOBS AND INSTANCES
---

In Prometheus terms, an endpoint you can scrape is called an **instance**, usually corresponding to a single process. A collection of instances with the same purpose, a process replicated for scalability or reliability for example, is called a **job**

## Automatically generated labels and time series

When Prometheus scrapes a target, it attaches some labels **automatically** to the scraped time series which serve to identify the scraped target:

- job: The configured job name that the target belongs to.
- instance: The `<host>:<port>` part of the target's URL that was scraped.
