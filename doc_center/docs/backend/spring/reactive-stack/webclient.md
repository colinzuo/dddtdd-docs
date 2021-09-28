
## Configuration

```java
WebClient client = WebClient.builder()
  .codecs(configurer -> ... )
  .build(); 

WebClient client1 = WebClient.builder()
  .filter(filterA)
  .filter(filterB)
  .build(); 

WebClient client2 = client1.mutate()
  .filter(filterC)
  .filter(filterD)
  .build(); 

// client1 has filterA, filterB 
// client2 has filterA, filterB, filterC, filterD 

WebClient webClient = WebClient.builder()
  .codecs(configurer -> configurer
    .defaultCodecs().maxInMemorySize(2 * 1024 * 1024))
  .build(); 
```

### Reactor Netty

```java
HttpClient httpClient = HttpClient.create()
  .secure(sslSpec -> ...); 

WebClient webClient = WebClient.builder()
  .clientConnector(new ReactorClientHttpConnector(httpClient))
  .build(); 
```

#### Timeouts

To configure a connection timeout

```java
import io.netty.channel.ChannelOption; 

HttpClient httpClient = HttpClient.create()
  .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000); 

WebClient webClient = WebClient.builder()
  .clientConnector(new ReactorClientHttpConnector(httpClient))
  .build(); 
```

To configure a read or write timeout

```java
import io.netty.handler.timeout.ReadTimeoutHandler; 
import io.netty.handler.timeout.WriteTimeoutHandler; 

HttpClient httpClient = HttpClient.create()
  .doOnConnected(conn -> conn
    .addHandlerLast(new ReadTimeoutHandler(10))
    .addHandlerLast(new WriteTimeoutHandler(10))); 

// Create WebClient... 
```

To configure a response timeout for all requests

```java
HttpClient httpClient = HttpClient.create()
  .responseTimeout(Duration.ofSeconds(2)); 
  
// Create WebClient... 
```

To configure a response timeout for a specific request

```java
WebClient.create().get()
  .uri("https://example.org/path")
  .httpRequest(httpRequest -> {
    HttpClientRequest reactorRequest = httpRequest.getNativeRequest();reactorRequest.responseTimeout(Duration.ofSeconds(2));
  })
  .retrieve()
  .bodyToMono(String.class); 
```

## retrieve

The retrieve() method can be used to declare how to extract the response.

```java
WebClient client = WebClient.create("https://example.org"); 

Mono<ResponseEntity<Person>> result = client.get()
  .uri("/persons/{id}", id).accept(MediaType.APPLICATION_JSON)
  .retrieve()
  .toEntity(Person.class); 
```

Or to get only the body:

```java
WebClient client = WebClient.create("https://example.org"); 

Mono<Person> result = client.get()
  .uri("/persons/{id}", id).accept(MediaType.APPLICATION_JSON)
  .retrieve()
  .bodyToMono(Person.class); 
```

By default, 4xx or 5xx responses result in an WebClientResponseException

```java
Mono<Person> result = client.get()
  .uri("/persons/{id}", id).accept(MediaType.APPLICATION_JSON)
  .retrieve()
  .onStatus(HttpStatus::is4xxClientError, response -> ...)
  .onStatus(HttpStatus::is5xxServerError, response -> ...)
  .bodyToMono(Person.class); 
```

## Exchange

for more advanced cases that require more control, such as to decode the response differently depending on the response status

```java
Mono<Object> entityMono = client.get()
  .uri("/persons/1")
  .accept(MediaType.APPLICATION_JSON)
  .exchangeToMono(response -> {
    if (response.statusCode().equals(HttpStatus.OK)) {
      return response.bodyToMono(Person.class);
    } else if (response.statusCode().is4xxClientError()) {
      // Suppress error status code
      return response.bodyToMono(ErrorContainer.class);
    } else {
      // Turn to error
      return response.createException().flatMap(Mono::error);
    }
  }); 
```

## Request Body

```java
Mono<Person> personMono = ... ; 

Mono<Void> result = client.post()
  .uri("/persons/{id}", id)
  .contentType(MediaType.APPLICATION_JSON)
  .body(personMono, Person.class)
  .retrieve()
  .bodyToMono(Void.class);
```

if you have the actual value, you can use the bodyValue shortcut method

```java
Person person = ... ; 

Mono<Void> result = client.post()
  .uri("/persons/{id}", id)
  .contentType(MediaType.APPLICATION_JSON)
  .bodyValue(person)
  .retrieve()
  .bodyToMono(Void.class); 
```

### Form Data

To send form data, you can provide a `MultiValueMap<String, String>`  as the body. 

Note that the content is automatically set to application/x-www-form-urlencoded by the FormHttpMessageWriter

```java
MultiValueMap<String, String> formData = ... ; 

Mono<Void> result = client.post()
  .uri("/path", id)
  .bodyValue(formData)
  .retrieve()
  .bodyToMono(Void.class); 
```

You can also supply form data in-line by using BodyInserters

```java
import static org.springframework.web.reactive.function.BodyInserters.*; 

Mono<Void> result = client.post()
  .uri("/path", id)
  .body(fromFormData("k1", "v1").with("k2", "v2"))
  .retrieve()
  .bodyToMono(Void.class); 
```

### Multipart Data

```java
MultipartBodyBuilder builder = new MultipartBodyBuilder(); 

builder.part("fieldPart", "fieldValue"); 
builder.part("filePart1", new FileSystemResource("...logo.png")); 
builder.part("jsonPart", new Person("Jason")); 
builder.part("myPart", part); // Part from a server request 

MultiValueMap<String, HttpEntity<?>> parts = builder.build(); 
```

```java
MultipartBodyBuilder builder = ...; 

Mono<Void> result = client.post()
  .uri("/path", id)
  .body(builder.build())
  .retrieve()
  .bodyToMono(Void.class); 
```

## Filters

You can register a client filter (ExchangeFilterFunction) through the WebClient.Builder  in order to intercept and modify requests

```java
WebClient client = WebClient.builder()
  .filter((request, next) -> {
    ClientRequest filtered = ClientRequest.from(request)
      .header("foo", "bar")
      .build();
    return next.exchange(filtered);
  })
  .build(); 
```

Filters can be added or removed by mutating an existing WebClient  instance

```java
import static org.springframework.web.reactive.function.client.ExchangeFilterFunctions.basicAuthentication; 

WebClient client = webClient.mutate()
  .filters(filterList -> {
    filterList.add(0, basicAuthentication("user", "password"));
  })
  .build(); 
```

When filters handle the response in some way, extra care must be taken to always consume its content or to otherwise propagate it downstream 

```java
public ExchangeFilterFunction renewTokenFilter() {
  return (request, next) -> next.exchange(request).flatMap(response -> {
    if (response.statusCode().value() == HttpStatus.UNAUTHORIZED.value()) {
      return response.releaseBody()
        .then(renewToken())
        .flatMap(token -> {
          ClientRequest newRequest = ClientRequest.from(request).build();
          return next.exchange(newRequest);
        });
    } else {
      return Mono.just(response);
    }
  }); 
} 
```

## Attributes

You can add attributes to a request. This is convenient if you want to pass information through the filter chain and influence the behavior of filters for a given request

```java
WebClient client = WebClient.builder()
  .filter((request, next) -> {
    Optional<Object> usr = request.attribute("myAttribute");
    // ...
  })
  .build(); 
  
client.get().uri("https://example.org/")
  .attribute("myAttribute", "...")
  .retrieve()
  .bodyToMono(Void.class);} 
```

## Context

Attributes provide a convenient way to pass information to the filter chain but they **only influence the current request**. If you want to pass information that propagates to additional requests that are nested, e.g. via flatMap, or executed after, e.g. via concatMap, then you’ll need to use the Reactor Context. 

```java
WebClient client = WebClient.builder()
  .filter((request, next) ->
    Mono.deferContextual(contextView -> {
      String value = contextView.get("foo");
      // ...
    }))
  .build(); 
  
client.get().uri("https://example.org/")
  .retrieve()
  .bodyToMono(String.class)
  .flatMap(body -> {
    // perform nested request (context propagates automatically)...
  })
  .contextWrite(context -> context.put("foo", ...)); 
```

## Synchronous Use

```java
Person person = client.get().uri("/person/{id}", i)
  .retrieve()
  .bodyToMono(Person.class)
  .block(); 
  
List<Person> persons = client.get().uri("/persons")
  .retrieve()
  .bodyToFlux(Person.class)
  .collectList()
  .block(); 
```

```java
Mono<Person> personMono = client.get()
  .uri("/person/{id}", personId)
  .retrieve()
  .bodyToMono(Person.class); 
  
Mono<List<Hobby>> hobbiesMono = client.get()
  .uri("/person/{id}/hobbies", personId)
  .retrieve()
  .bodyToFlux(Hobby.class)
  .collectList(); 
  
Map<String, Object> data = Mono.zip(personMono, hobbiesMono, 
  (person, hobbies) -> {
    Map<String, String> map = new LinkedHashMap<>();
    map.put("person", person);
    map.put("hobbies", hobbies);
    
    return map;
  })
  .block(); 
```
