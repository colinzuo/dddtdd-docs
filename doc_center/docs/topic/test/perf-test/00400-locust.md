
## 概述

Locust runs every user inside its own greenlet (a lightweight process/coroutine)

Locust makes it easy to run load tests distributed over multiple machines. It is event-based (using **gevent**), which makes it possible for a single process to handle many thousands concurrent users

<https://www.gevent.org/intro.html>

## 协议

Locust only comes with built-in support for HTTP/HTTPS but it can be extended to test almost any system. This is normally done by wrapping the protocol library and triggering a request event after each call has completed, to let Locust know what happened.

### HTTP

```python
import time
from locust import HttpUser, task, between

class QuickstartUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def hello_world(self):
        self.client.get("/hello")
        self.client.get("/world")

    @task(3)
    def view_items(self):
        for item_id in range(10):
            self.client.get(f"/item?id={item_id}", name="/item")
            time.sleep(1)

    def on_start(self):
        self.client.post("/login", json={"username":"foo", "password":"bar"})
```

### gRPC

<https://docs.locust.io/en/latest/testing-other-systems.html#grpc>
