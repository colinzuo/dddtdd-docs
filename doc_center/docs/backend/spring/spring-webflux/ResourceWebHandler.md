
`public class ResourceWebHandler implements WebHandler, InitializingBean {`

缺省通过PathResourceResolver查找Resource

```java
	private Mono<Resource> getResource(String resourcePath, List<? extends Resource> locations) {
		return Flux.fromIterable(locations)
				.concatMap(location -> getResource(resourcePath, location))
				.next();
	}

	protected Mono<Resource> getResource(String resourcePath, Resource location) {

			Resource resource = location.createRelative(resourcePath);
			if (resource.isReadable()) {
				if (checkResource(resource, location)) {
					return Mono.just(resource);
				}
```