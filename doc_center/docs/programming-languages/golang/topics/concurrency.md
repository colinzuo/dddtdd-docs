
## pattern

- Future: channel buffer 1, 单一结果，这样结果可以不阻塞存到channel
- Queue: channel unbuffer，多个消息
- 给用户展现同步接口，内部通过channel和goroutine实现并发
- 如果写入侧不检查，那么接收侧哪怕知道结果没用也需要接收从而不block写入侧
- 可以通过一个单一元素的channel来实现串行运行
- a worker pool can bound the peak resource usage of the program
- 通过channel buffer设为limit来限制并发: Recall that we acquire this semaphore by sending a token, and we release it by discarding a token.

## Refs

<https://go.dev/blog/pipelines>
[Google I/O 2012 - Go Concurrency Patterns](https://www.youtube.com/watch?v=f6kdp27TYZs)
[Google I/O 2013 - Advanced Go Concurrency Patterns](https://www.youtube.com/watch?v=QDDwwePbDtw)
[Concurrency is not Parallelism by Rob Pike](https://www.youtube.com/watch?v=oV9rvDllKEg)
[GopherCon 2017: Kavya Joshi - Understanding Channels](https://www.youtube.com/watch?v=KBZlN0izeiY)
[Rethinking Classical Concurrency Patterns](https://drive.google.com/file/d/1nPdvhB0PutEJzdCq5ms6UI58dp50fcAN/view)
[GopherCon 2018: Bryan C. Mills - Rethinking Classical Concurrency Patterns](https://www.youtube.com/watch?v=5zXAHh5tJqQ)
[GopherCon 2018: Filippo Valsorda- Asynchronous Networking Patterns](https://www.youtube.com/watch?v=afSiVelXDTQ)
[Concurrency Patterns In Go](https://www.youtube.com/watch?v=YEKjSzIwAdA)
[Concurrency](https://blogtitle.github.io/categories/concurrency/)

## pipelines

<https://go.dev/blog/pipelines>

Informally, a pipeline is a series of stages connected by channels, where each stage is a group of goroutines running the same function

### Fan-out, fan-in

Multiple functions can read from the same channel until that channel is closed; this is called **fan-out**

A function can read from multiple inputs and proceed until all are closed by multiplexing the input channels onto a single channel that’s closed when all the inputs are closed. This is called **fan-in**

### merge

```go
func merge(cs ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)

    // Start an output goroutine for each input channel in cs.  output
    // copies values from c to out until c is closed, then calls wg.Done.
    output := func(c <-chan int) {
        for n := range c {
            out <- n
        }
        wg.Done()
    }
    wg.Add(len(cs))
    for _, c := range cs {
        go output(c)
    }

    // Start a goroutine to close out once all the output goroutines are
    // done.  This must start after the wg.Add call.
    go func() {
        wg.Wait()
        close(out)
    }()
    return out
}
```

### Explicit cancellation

```go
func main() {
    // Set up a done channel that's shared by the whole pipeline,
    // and close that channel when this pipeline exits, as a signal
    // for all the goroutines we started to exit.
    done := make(chan struct{})
    defer close(done)          

    in := gen(done, 2, 3)

    // Distribute the sq work across two goroutines that both read from in.
    c1 := sq(done, in)
    c2 := sq(done, in)

    // Consume the first value from output.
    out := merge(done, c1, c2)
    fmt.Println(<-out) // 4 or 9

    // done will be closed by the deferred call.      
}

func merge(done <-chan struct{}, cs ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)

    // Start an output goroutine for each input channel in cs.  output
    // copies values from c to out until c or done is closed, then calls
    // wg.Done.
    output := func(c <-chan int) {
        defer wg.Done()
        for n := range c {
            select {
            case out <- n:
            case <-done:
                return
            }
        }
    }
    // ... the rest is unchanged ...
```

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
