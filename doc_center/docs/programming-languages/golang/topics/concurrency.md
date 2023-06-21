

## Bryan Mills's talk on concurrency patterns

[Bryan Mills's talk on concurrency patterns](https://drive.google.com/file/d/1nPdvhB0PutEJzdCq5ms6UI58dp50fcAN/view)

### asynchronous api

An asynchronous API returns to the caller before its result is ready.

通过callback获取结果

### future api

通过指定接口获取结果

golang里可以通过返回buffer为1的channel，然后从channel获取

`c := make(chan Item, 1)`

### PRODUCER–CONSUMER QUEUE: API

producer和consumer之间通过channel通信

### CALLER-SIDE CONCURRENCY: SYNCHRONOUS API

#### VARIABLES

通过errgroup使用goroutine来并发，然后在里面通过closure把结果设置到variable上

```go
var a, b Item
g, ctx := errgroup.WithContext(ctx)
g.Go(func() (err error) {
    a, err = Fetch(ctx, "a")
    return err
})
g.Go(func() (err error) {
    b, err = Fetch(ctx, "b")
    return err
})
err := g.Wait()
[...]
consume(a, b)
```

### condition

condition的问题
- 没法cancel
- wakeup不可控

### COMMUNICATION: RESOURCE POOL

```go
func (p *Pool) Acquire(ctx context.Context) (net.Conn, error) {
    select {
    case conn := <-p.idle:
        return conn, nil
    case p.sem <- token{}:
        conn, err := dial()
        if err != nil {
            <-p.sem
        }
        return conn, err
    case <-ctx.Done():
        return nil, ctx.Err()
    }
}
```

### COMMUNICATION: QUEUE CANCELLATION

```go
func (q *Queue) Get(ctx context.Context) (Item, error) {
    var items []Item

    select {
    case <-ctx.Done():
        return 0, ctx.Err()
    case items = <-q.items:
    }

    item := items[0]
    if len(items) == 1 {
        q.empty <- true
    } else {
        q.items <- items[1:]
    }

    return item, nil
}
```

### SEMAPHORE CHANNEL: LIMITING CONCURRENCY

```go
sem := make(chan token, limit)
for _, task := range hugeSlice {
    sem <- token{}
    go func(task Task) {
        perform(task)
        <-sem
    }(task)
}
```
