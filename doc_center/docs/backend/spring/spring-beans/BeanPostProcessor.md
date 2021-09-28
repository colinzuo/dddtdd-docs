
Factory hook that allows for custom modification of new bean instances — for example, checking for marker interfaces or wrapping beans with proxies.

Typically, post-processors that populate beans via marker interfaces or the like will implement postProcessBeforeInitialization, while post-processors that wrap beans with proxies will normally implement postProcessAfterInitialization.

- `Object postProcessBeforeInitialization(Object bean, String beanName)`
- `Object postProcessAfterInitialization(Object bean, String beanName)`
