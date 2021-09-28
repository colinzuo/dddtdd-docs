
首先是通过AutoWired配置

- BeanFactory beanFactory
- ReactiveAdapterRegistry adapterRegistry
- ReactiveAuthenticationManager authenticationManager
- ReactiveUserDetailsService reactiveUserDetailsService
- PasswordEncoder passwordEncoder
- ReactiveUserDetailsPasswordService userDetailsPasswordService

## WebFluxConfigurer authenticationPrincipalArgumentResolverConfigurer

创建WebFluxConfigurer用于配置AuthenticationPrincipalArgumentResolver

## AuthenticationPrincipalArgumentResolver authenticationPrincipalArgumentResolver

参数上有注解AuthenticationPrincipal

- 获取Authentication，`ReactiveSecurityContextHolder.getContext().map(SecurityContext::getAuthentication)`
- 提取Principal并按需转换，`resolvePrincipal(parameter, authentication.getPrincipal())`

## CurrentSecurityContextArgumentResolver reactiveCurrentSecurityContextArgumentResolver

参数上有注解CurrentSecurityContext

`Mono<SecurityContext> reactiveSecurityContext = ReactiveSecurityContextHolder.getContext()`

## ServerHttpSecurity httpSecurity

`@Scope("prototype")`

配置authenticationManager

如果没有配置则缺省使用UserDetailsRepositoryReactiveAuthenticationManager，
它会通过reactiveUserDetailsService获取UserDetails，然后通过PasswordEncoder
效验Credential是否匹配

```java
	private ReactiveAuthenticationManager authenticationManager() {
		if (this.authenticationManager != null) {
			return this.authenticationManager;
		}
		if (this.reactiveUserDetailsService != null) {
			UserDetailsRepositoryReactiveAuthenticationManager manager = new UserDetailsRepositoryReactiveAuthenticationManager(
					this.reactiveUserDetailsService);
			if (this.passwordEncoder != null) {
				manager.setPasswordEncoder(this.passwordEncoder);
			}
			manager.setUserDetailsPasswordService(this.userDetailsPasswordService);
			return manager;
		}
```
