---
sidebar_position: 5
---

## LocalValidatorFactoryBean defaultValidator

配置生成缺省ValidatorFactory，和缺省Validator

```java
  this.validatorFactory = configuration.buildValidatorFactory();
  setTargetValidator(this.validatorFactory.getValidator());
```

## MethodValidationPostProcessor methodValidationPostProcessor

通过AOP来做method validation，针对配置`Validated`并且没有被exclude
的类的method做aop proxy

```java
  ExecutableValidator execVal = this.validator.forExecutables();
  Method methodToValidate = invocation.getMethod();
  
  result = execVal.validateParameters(target, methodToValidate, invocation.getArguments(), groups);

  Object returnValue = invocation.proceed();

  result = execVal.validateReturnValue(target, methodToValidate, returnValue, groups);
```
