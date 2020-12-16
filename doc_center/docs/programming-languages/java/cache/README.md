---
title: Java Cache介绍
slug: /programming-languages/java/cache/
---

缓存分为本地缓存和分布式缓存，本地缓存可以使用[Caffeine](./caffeine)，
分布式缓存可以使用redis

只要是远程的IO调用就会增加至少毫秒级的延迟，并且是调用就有报错的可能，
所以对热门数据进行本地缓存既能减少延迟又能减少出错率。
