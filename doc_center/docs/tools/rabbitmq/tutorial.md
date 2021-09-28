
<https://www.rabbitmq.com/tutorials/tutorial-one-java.html>

## Hello World

```java
  private final static String QUEUE_NAME = "hello";

  ConnectionFactory factory = new ConnectionFactory();
  factory.setHost("localhost");
  try (Connection connection = factory.newConnection();
      Channel channel = connection.createChannel()) {

  }

  channel.queueDeclare(QUEUE_NAME, false, false, false, null);
  String message = "Hello World!";
  channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
  System.out.println(" [x] Sent '" + message + "'");
```

```java
  ConnectionFactory factory = new ConnectionFactory();
  factory.setHost("localhost");
  Connection connection = factory.newConnection();
  Channel channel = connection.createChannel();

  channel.queueDeclare(QUEUE_NAME, false, false, false, null);
  System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

  DeliverCallback deliverCallback = (consumerTag, delivery) -> {
      String message = new String(delivery.getBody(), "UTF-8");
      System.out.println(" [x] Received '" + message + "'");
  };
  channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> { });    
```

## Work Queues

```java
boolean autoAck = true; // acknowledgment is covered below
channel.basicConsume(TASK_QUEUE_NAME, autoAck, deliverCallback, consumerTag -> { });
```

```java
channel.basicQos(1); // accept only one unack-ed message at a time (see below)

DeliverCallback deliverCallback = (consumerTag, delivery) -> {
  String message = new String(delivery.getBody(), "UTF-8");

  System.out.println(" [x] Received '" + message + "'");
  try {
    doWork(message);
  } finally {
    System.out.println(" [x] Done");
    channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
  }
};
boolean autoAck = false;
channel.basicConsume(TASK_QUEUE_NAME, autoAck, deliverCallback, consumerTag -> { });
```

```java
boolean durable = true;
channel.queueDeclare("task_queue", durable, false, false, null);

channel.basicPublish("", "task_queue",
            MessageProperties.PERSISTENT_TEXT_PLAIN,
            message.getBytes());
```

## Publish/Subscribe

```java
channel.exchangeDeclare("logs", "fanout");

// named exchange
channel.basicPublish( "logs", "", null, message.getBytes());

// temporary queue
String queueName = channel.queueDeclare().getQueue();

channel.queueBind(queueName, "logs", "");
```

## Routing

```java
channel.exchangeDeclare(EXCHANGE_NAME, "direct");

channel.basicPublish(EXCHANGE_NAME, severity, null, message.getBytes());
```

```java
String queueName = channel.queueDeclare().getQueue();

for(String severity : argv){
  channel.queueBind(queueName, EXCHANGE_NAME, severity);
}
```

## Topics

```java
  channel.exchangeDeclare(EXCHANGE_NAME, "topic");

  channel.basicPublish(EXCHANGE_NAME, routingKey, null, message.getBytes("UTF-8"));
```

```java
  for (String bindingKey : argv) {
      channel.queueBind(queueName, EXCHANGE_NAME, bindingKey);
  }
```

## RPC

```java
  callbackQueueName = channel.queueDeclare().getQueue();

  BasicProperties props = new BasicProperties
                              .Builder()
                              .replyTo(callbackQueueName)
                              .build();

  channel.basicPublish("", "rpc_queue", props, message.getBytes());
```

## Publisher Confirms

```java
  Channel channel = connection.createChannel();
  channel.confirmSelect();

  channel.addConfirmListener((sequenceNumber, multiple) -> {
      // code when message is confirmed
  }, (sequenceNumber, multiple) -> {
      // code when message is nack-ed
  });

  ConcurrentNavigableMap<Long, String> outstandingConfirms = new ConcurrentSkipListMap<>();
  // ... code for confirm callbacks will come later
  String body = "...";
  outstandingConfirms.put(channel.getNextPublishSeqNo(), body);
  channel.basicPublish(exchange, queue, properties, body.getBytes());  
```
