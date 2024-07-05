---
sidebar_position: 1
---

```java
private ScheduledExecutorService scheduledExecutorService;
private ChannelState channelState;
private ConnectOptions connectOptions;
private ExponentialBackOff backOff;
private BackOffExecution backOffExecution;
private ListenableScheduledFuture reconnectFuture;
private ListenableScheduledFuture connectEndFuture;
private ListenableScheduledFuture keepaliveFuture;
```

## connect

connectOptions指定connectionTimeout和automaticReconnect

- 检查状态为DISCONNECTED
- 根据connectionTimeout启动连接超时timer
- 准备重连相关的backoff
- 更新状态到CONNECTING
- doConnect具体连接

```java
  synchronized （channelLock) {
    if (channelState != ChannelState.DISCONNECTED) {
        throw new IllegalStateException("Channel state is not disconnected");
    }

    backOff = new ExponentialBackOff(
            properties.getExpBackOffInitialInterval(),
            properties.getExpBackOffMultiplier()
    );
    if (connectOptions.getConnectionTimeout() > 0) {
        backOff.setMaxElapsedTime(connectOptions.getConnectionTimeout());

        connectEndFuture = scheduledExecutorService.schedule(
                this::onConnectEndTimeout,
                connectOptions.getConnectionTimeout(), TimeUnit.MILLISECONDS);
    }

    setChannelState(ChannelState.CONNECTING);    
  }

  scheduledExecutorService.execute(this::doConnect);
```

## disconnect

- 如果状态为DISCONNECTED或DISCONNECTING则直接返回
- 更新状态为DISCONNECTING
- 停止超时和重连计时器
- 调用doDisconnect断开连接

```java
  synchronized (channelLock) {
      if (channelState == ChannelState.DISCONNECTED ||
              channelState == ChannelState.DISCONNECTING) {
          return;
      }

      setChannelState(ChannelState.DISCONNECTING);

      if (connectEndFuture != null) {
          connectEndFuture.cancel(false);
          connectEndFuture = null;
      }

      if (reconnectFuture != null) {
          reconnectFuture.cancel(true);
          reconnectFuture = null;
      }
  }

  scheduledExecutorService.execute(this::doDisconnect);
```

## onConnectEndTimeout

- 如果状态不为CONNECTING则直接返回
- 停止重连timer
- 更新状态为DISCONNECTED
- 发送ConnectStateEvent到EventBus

```java
  synchronized (channelLock) {
      if (channelState == ChannelState.CONNECTING) {
          if (reconnectFuture != null) {
              reconnectFuture.cancel(true);
              reconnectFuture = null;
          }

          setChannelState(ChannelState.DISCONNECTED);

          sendConnectStateEventForTimeout();
      }
  }
```

## onReconnectTimeout

- 检查状态，不为CONNECTING则直接返回
- 调用doConnect连接

```java
  synchronized (switchLock) {
      if (channelState == ChannelState.CONNECTING) {
          doConnect();
      }
  }
```

## scheduleReconnectIfNeeded

- 获取重连等待时间
- 启动重连timer

```java
    long waitInterval = backOffExecution.nextBackOff();

    if (waitInterval != BackOffExecution.STOP) {
        reconnectFuture = scheduledExecutorService.schedule(
                this::onReconnectTimeout, waitInterval, TimeUnit.MILLISECONDS);
    }
```
