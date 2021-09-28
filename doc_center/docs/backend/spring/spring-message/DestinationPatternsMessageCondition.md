
## combine

```java
	public DestinationPatternsMessageCondition combine(DestinationPatternsMessageCondition other) {

					result.add(this.routeMatcher.combine(pattern1, pattern2));    
```

## Matching

```java
	public DestinationPatternsMessageCondition getMatchingCondition(Message<?> message) {

		Object destination = message.getHeaders().get(LOOKUP_DESTINATION_HEADER);

		for (String pattern : this.patterns) {
			if (pattern.equals(destination) || matchPattern(pattern, destination)) {
				matches.add(pattern);
			}

	private boolean matchPattern(String pattern, Object destination) {
		return destination instanceof RouteMatcher.Route ?
				this.routeMatcher.match(pattern, (RouteMatcher.Route) destination) :
				((SimpleRouteMatcher) this.routeMatcher).getPathMatcher().match(pattern, (String) destination);
	}                    
```
