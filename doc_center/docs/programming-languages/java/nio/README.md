

## [Introduction to the Java NIO Selector][]

```java
  // Creating a Selector
  Selector selector = Selector.open()

  // Registering Selectable Channels
  channel.configureBlocking(false);
  SelectionKey key = channel.register(selector, SelectionKey.OP_READ);

  // Channel Key Selection
  int channels = selector.select();
  Set<SelectionKey> selectedKeys = selector.selectedKeys();

  Iterator<SelectionKey> iter = selectedKeys.iterator();
  while (iter.hasNext()) {

      SelectionKey key = iter.next();

      if (key.isAcceptable()) {
          register(selector, serverSocket);
      }

      if (key.isReadable()) {
          answerWithEcho(buffer, key);
      }
      iter.remove();
  }
```

## [Introduction to the Java NIO2 File API][]

```java
import java.nio.file.*;

    Path p = Paths.get(HOME);

    // Checking a File or Directory
    Files.exists(p);

    Files.notExists(p);

    Files.isRegularFile(p);

    Files.isReadable(p);

    Files.isWritable(p);

    Files.isExecutable(p);

    // Creating Files
    Files.createFile(p);

    // mkdir
    Files.createDirectory(p);

    // mkdir -p
    Files.createDirectories(subdir);

    Files.createTempFile(p, prefix, suffix);

    // Deleting a File
    Files.delete(p);

    Files.deleteIfExists(p);

    // Copying Files
    Files.copy(file1, file2);
    Files.copy(file1, file2, StandardCopyOption.REPLACE_EXISTING);

    // Moving Files
    Files.move(file1, file2);
    Files.move(file1, file2, StandardCopyOption.REPLACE_EXISTING);
```

## [Java NIO2 Path API][]

```java
import java.nio.file.*;

  Path p = Paths.get("/articles/baeldung");

  // Retrieving Path Information
  Path fileName = p.getFileName();

  Path subPath2 = p.subpath(0,2);

  Path parent = p.getParent();

  Path root = p.getRoot();

  // Normalizing a Path
  Path cleanPath = p.normalize();

  // Path Conversion
  URI uri = p.toUri();

  Path absPath = p.toAbsolutePath();

  // Joining Paths
  Path p2 = p.resolve("java");

  // Relativizing Paths
  Path p1_rel_p2 = p1.relativize(p2);

  // Comparing Paths
  p1.equals(p2);

  p1.startsWith("/baeldung");

  p1.endsWith("articles");
```

## [Guide to Java NIO2 Asynchronous Channel APIs][]

```java
import java.nio.channels.*;

  AsynchronousServerSocketChannel listener
    = AsynchronousServerSocketChannel.open().bind(null);

  listener.accept(
    attachment, new CompletionHandler<AsynchronousSocketChannel, Object>() {
      public void completed(
        AsynchronousSocketChannel client, Object attachment) {
            // do whatever with client
        }
      public void failed(Throwable exc, Object attachment) {
            // handle failure
        }
    });
```

## [A Guide To NIO2 Asynchronous File Channel][]

```java
import java.nio.channels.*;

  Path filePath = Paths.get("/path/to/file");

  AsynchronousFileChannel fileChannel = AsynchronousFileChannel.open(
    filePath, READ, WRITE, CREATE, DELETE_ON_CLOSE);

  ByteBuffer buffer = ByteBuffer.allocate(1024);

  fileChannel.read(
    buffer, 0, buffer, new CompletionHandler<Integer, ByteBuffer>() {

      @Override
      public void completed(Integer result, ByteBuffer attachment) {
          // result is number of bytes read
          // attachment is the buffer containing content
      }
      @Override
      public void failed(Throwable exc, ByteBuffer attachment) {

      }
  });

  ByteBuffer buffer = ByteBuffer.allocate(1024);
  buffer.put("hello world".getBytes());
  buffer.flip();

  fileChannel.write(
    buffer, 0, buffer, new CompletionHandler<Integer, ByteBuffer>() {

      @Override
      public void completed(Integer result, ByteBuffer attachment) {
          // result is number of bytes written
          // attachment is the buffer
      }
      @Override
      public void failed(Throwable exc, ByteBuffer attachment) {

      }
  });
```

[Introduction to the Java NIO Selector]: https://www.baeldung.com/java-nio-selector

[Introduction to the Java NIO2 File API]: https://www.baeldung.com/java-nio-2-file-api

[Java NIO2 Path API]: https://www.baeldung.com/java-nio-2-path

[Guide to Java NIO2 Asynchronous Channel APIs]: https://www.baeldung.com/java-nio-2-async-channels

[A Guide To NIO2 Asynchronous File Channel]: https://www.baeldung.com/java-nio2-async-file-channel
