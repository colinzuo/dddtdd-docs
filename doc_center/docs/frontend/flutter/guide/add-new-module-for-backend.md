---
title: 为后端添加新模块
sidebar_position: 1
---

## model

添加model，比如CRUD对应model

## service

添加service接口和实现，比如CRUD接口

`service/XXX_service.dart`

`service/impl/XXX_service_impl.dart`

## bloc

bloc就是一种状态机，在某个state下按照收到的event进行
状态流转，和ui分开后更清晰，也方便测试。

## getIt & BlocProvider

通过getIt和BlocProvider提供service和bloc的获取

## page & component

构建页面，使用bloc维护state

## route

go_router添加路由
