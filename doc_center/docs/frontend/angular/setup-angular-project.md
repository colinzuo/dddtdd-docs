---
title: 搭建Angular工程
---

## Install Angular CLI

```bash
npm install -g @angular/cli

ng version
```

## Create an angular workspace and initial application
[scss](https://sass-lang.com/guide)
```bash
ng new my-app --style=scss --routing
```

## Angular Material

```bash
ng add @angular/material
```

## Angular Flex Layout

```bash
npm i -s @angular/flex-layout @angular/cdk
```

## PWA

```bash
ng add @angular/pwa
```

### Install http server

```bash
npm install http-server -g
```

### Try PWA

```bash
ng build --prod

http-server -p 8080 -c-1 dist/<project-name>

http://localhost:8080/
```

## prettier
install prettier on vsCode and 'Shift + Alt + F' to format when needed

## NGRX
```bash
npm install --save @ngrx/store @ngrx/store-devtools @ngrx/effects @ngrx/router-store
```

## ngx-translate
```bash
npm install --save @ngx-translate/core @ngx-translate/http-loader
```

## typescript
```bash
npm install --save-dev typescript @types/node
```

## fontawesome
```bash
npm install --save @fortawesome/fontawesome-free
ng add @fortawesome/angular-fontawesome
```

## crypto-js
```bash
npm install --save crypto-js @types/crypto-js
```

## moment
```bash
npm install --save moment
```

## socket.io-client
```bash
npm install --save socket.io-client
```

## uuid
```bash
npm install --save uuid
```

## use ssl

### create certificate
```bash
openssl req -new -x509 -newkey rsa:2048 -sha256 -nodes -keyout localhost.key -days 3560 -out localhost.crt -config certificate.cnf
```

### update package.json
```
    "start": "ng serve --ssl --ssl-key ./cert/localhost.key --ssl-cert ./cert/localhost.crt",
```

## Proxying to a backend server
[Proxying to a backend server](https://angular.io/guide/build)

```
{
    "/XXX-api": {
      "target": "http://localhost:6000",
      "target_local": "http://localhost:6000",
      "target_other": "https://other_url",
      "secure": false,
      "changeOrigin": true
    }
}
```

## ts-config

tsconfig.json
```
    "allowSyntheticDefaultImports": true,

    "paths": {
      "@app-root/*": ["src/app/*"],
      "@src-root/*": ["src/*"]
    }
```

## Run the application

```bash
npm start
```
