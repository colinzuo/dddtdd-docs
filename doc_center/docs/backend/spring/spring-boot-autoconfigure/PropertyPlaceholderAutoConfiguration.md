
## PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer

解析property文件中或者Value注解中的placeholder

```
rootPath=myrootdir
subPath=${rootPath}/subdi

@Value("${person.age}")
```