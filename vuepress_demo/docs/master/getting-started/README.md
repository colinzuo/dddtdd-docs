# Setup

The following section teaches you how to setup dev environment.

## Misc

npm install --save jasmine-marbles

npm install --save bootstrap

<!-- npm install -D jest jest-preset-angular @types/jest -->
<!-- npm install --save-dev cypress -->

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

