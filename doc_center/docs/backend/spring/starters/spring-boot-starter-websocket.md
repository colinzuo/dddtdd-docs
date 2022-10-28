
<https://github.com/spring-projects/spring-boot/blob/main/spring-boot-project/spring-boot-starters/spring-boot-starter-websocket/build.gradle>

```
dependencies {
	api(project(":spring-boot-project:spring-boot-starters:spring-boot-starter-web"))
	api("org.springframework:spring-messaging")
	api("org.springframework:spring-websocket")
}
```