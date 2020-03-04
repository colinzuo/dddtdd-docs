# Setup

The following section teaches you how to setup dev environment.

## Install Node.js

[nodejs.org](https://nodejs.org/en/download/)

Install one LTS version, such as 12.16.1
+ To check your version, run node -v in a terminal/console window

## Install Angular CLI

```bash
npm install -g @angular/cli
```

## Create an angular workspace and initial application
[scss](https://sass-lang.com/guide)
```bash
ng new my-app --style=scss --routing
```

## Run the application

```bash
ng serve
```

## Add basic packages

```bash
ng add @angular/material
ng add @angular/pwa
```

## Install http server

```bash
npm install http-server -g
```

## Try PWA

```bash
http-server -p 8080 -c-1 dist/<project-name>
```

## Misc
install prettier on vsCode and 'Shift + Alt + F' to format when needed

npm install --save @ngrx/store @ngrx/store-devtools @ngrx/effects @ngrx/router-store
npm install --save jasmine-marbles

npm install --save @ngx-translate/core
npm install --save @ngx-translate/http-loader
npm install --save bootstrap
npm install --save @fortawesome/fontawesome-free
ng add @fortawesome/angular-fontawesome

<!-- npm install -D jest jest-preset-angular @types/jest -->
<!-- npm install --save-dev cypress -->
npm install --save-dev typescript
npm install --save-dev @types/node

[ngrx-example-app](https://github.com/ngrx/platform/tree/master/projects/example-app)
[angular-ngrx-material-starter](https://github.com/tomastrajan/angular-ngrx-material-starter)
```
copy platform\projects\example-app\src\app\auth
```
ng generate component -m auth auth/components/login-page
ng generate component -m auth auth/components/login-form
ng generate component -m auth auth/components/logout-confirmation-dialog

ng generate module core
ng generate module features/login
ng generate module features/main
ng generate @angular/material:address-form -m main features/login/login
ng generate @angular/material:nav -m main features/main/main

