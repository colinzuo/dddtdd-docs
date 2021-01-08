---
title: OAuth2
---

## spring oauth2

[spring-boot-oauth2](https://spring.io/guides/tutorials/spring-boot-oauth2/)

[spring-authorization-server](https://spring.io/blog/2020/04/15/announcing-the-spring-authorization-server)

[Spring Cloud Gateway for Stateless Microservice Authorization](https://www.youtube.com/watch?v=RRMO4oNptoQ&list=PLAdzTan_eSPRlQ8t4TU5c-AB4SHV939M6&index=156)

## 在单页应用中使用oauth

[rest-api-spring-oauth2-angular](https://www.baeldung.com/rest-api-spring-oauth2-angular)

```
  login() {
    window.location.href = 
      'http://localhost:8083/auth/realms/baeldung/protocol/openid-connect/auth?
         response_type=code&scope=openid%20write%20read&client_id=' + 
         this._service.clientId + '&redirect_uri='+ this._service.redirectUri;
    }
```

## github

[authorizing-oauth-apps](https://docs.github.com/en/developers/apps/authorizing-oauth-apps)


## 参考文档
[RFC6749 The OAuth 2.0 Authorization Framework](https://tools.ietf.org/rfc/rfc6749.txt)

[RFC6750 The OAuth 2.0 Authorization Framework: Bearer Token Usage](https://tools.ietf.org/rfc/rfc6750.txt)

[RFC7662 OAuth 2.0 Token Introspection](https://tools.ietf.org/rfc/rfc7662.txt)

[RFC7519 JSON Web Token (JWT)](https://tools.ietf.org/rfc/rfc7519.txt)

[OAuth-2.0-Specifications](https://github.com/spring-projects-experimental/spring-authorization-server/wiki/OAuth-2.0-Specifications)

[Spring Security Reference](https://docs.spring.io/spring-security/site/docs/5.3.4.RELEASE/reference/html5/)

[keycloak](https://www.keycloak.org/)，如果自己搭建可以用这个

[spring-security-and-angular-js](https://spring.io/guides/tutorials/spring-security-and-angular-js/)

## 培训视频

[Enabling Secure Code at Scale with Spring & OAuth2](https://www.youtube.com/watch?v=EBdm683HdAo)

