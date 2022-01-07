
## [Completer][]

A way to produce Future objects and to complete them later with a value or error.

If you do need to create a Future from scratch — for example, when you're converting a callback-based API into a Future-based one — you can use a Completer as follows:

```dart
class AsyncOperation {
  final Completer _completer = new Completer();

  Future<T> doOperation() {
    _startOperation();
    return _completer.future; // Send future object back to client.
  }

  // Something calls this when the value is ready.
  void _finishOperation(T result) {
    _completer.complete(result);
  }

  // If something goes wrong, call this.
  void _errorHappened(error) {
    _completer.completeError(error);
  }
}
```

## [EventSink][]

A Sink that supports adding errors

## [Future][]

A Future is used to represent a potential value, or error, that will be available at some time in the future

- `asStream() → Stream<T>`
- `catchError(Function onError, {bool test(Object error)?}) → Future<T>`
- `then<R>(FutureOr<R> onValue(T value), {Function? onError}) → Future<R>`
- `timeout(Duration timeLimit, {FutureOr<T> onTimeout()?}) → Future<T>`
- `whenComplete(FutureOr<void> action()) → Future<T>`

- `any<T>(Iterable<Future<T>> futures) → Future<T>`
- `doWhile(FutureOr<bool> action()) → Future`
- `forEach<T>(Iterable<T> elements, FutureOr action(T element)) → Future`
- `wait<T>(Iterable<Future<T>> futures, {bool eagerError = false, void cleanUp(T successValue)?}) → Future<List<T>>`


## [FutureOr][]

A type representing values that are either `Future<T>` or T

## [MultiStreamController][]

An enhanced stream controller provided by Stream.multi.

- `sink → StreamSink<T>`
- `stream → Stream<T>`
- `add(T event) → void`
- `addError(Object error, [StackTrace? stackTrace]) → void`
- `addStream(Stream<T> source, {bool? cancelOnError}) → Future`
- `close() → Future`

## [Stream][]

A Stream provides a way to receive a sequence of events. Each event is either a data event, also called an element of the stream, or an error event, which is a notification that something has failed. When a stream has emitted all its event, a **single "done" event** will notify the listener that the end has been reached

A broadcast stream allows any number of listeners, and it fires its events when they are ready, whether there are listeners or not.

Broadcast streams are used for independent events/observers.

- `Stream.empty()`
- `Stream.error(Object error, [StackTrace? stackTrace])`
- `Stream.fromFuture(Future<T> future)`
- `Stream.fromFutures(Iterable<Future<T>> futures)`
- `Stream.fromIterable(Iterable<T> elements)`
- `Stream.multi(void onListen(MultiStreamController<T>), {bool isBroadcast = false})`
- `Stream.periodic(Duration period, [T computation(int computationCount)?])`
- `Stream.value(T value)`

- `first → Future<T>`
- `isEmpty → Future<bool>`
- `last → Future<T>`
- `single → Future<T>`

- `any(bool test(T element)) → Future<bool>`
- `asBroadcastStream({void onListen(StreamSubscription<T> subscription)?, void onCancel(StreamSubscription<T> subscription)?}) → Stream<T>`
- `asyncExpand<E>(Stream<E>? convert(T event)) → Stream<E>`
- `asyncMap<E>(FutureOr<E> convert(T event)) → Stream<E>`
- `cast<R>() → Stream<R>`
- `contains(Object? needle) → Future<bool>`
- `distinct([bool equals(T previous, T next)?]) → Stream<T>`
- `drain<E>([E? futureValue]) → Future<E>`
- `elementAt(int index) → Future<T>`
- `every(bool test(T element)) → Future<bool>`
- `expand<S>(Iterable<S> convert(T element)) → Stream<S>`
- `firstWhere(bool test(T element), {T orElse()?}) → Future<T>`
- `fold<S>(S initialValue, S combine(S previous, T element)) → Future<S>`
- `forEach(void action(T element)) → Future`
- `handleError(Function onError, {bool test(dynamic error)?}) → Stream<T>`
- `join([String separator = ""]) → Future<String>`
- `lastWhere(bool test(T element), {T orElse()?}) → Future<T>`
- `listen(void onData(T event)?, {Function? onError, void onDone()?, bool? cancelOnError}) → StreamSubscription<T>`
- `map<S>(S convert(T event)) → Stream<S>`
- `pipe(StreamConsumer<T> streamConsumer) → Future`
- `reduce(T combine(T previous, T element)) → Future<T>`
- `singleWhere(bool test(T element), {T orElse()?}) → Future<T>`
- `skip(int count) → Stream<T>`
- `skipWhile(bool test(T element)) → Stream<T>`
- `take(int count) → Stream<T>`
- `takeWhile(bool test(T element)) → Stream<T>`
- `timeout(Duration timeLimit, {void onTimeout(EventSink<T> sink)?}) → Stream<T>`
- `toList() → Future<List<T>>`
- `toSet() → Future<Set<T>>`
- `transform<S>(StreamTransformer<T, S> streamTransformer) → Stream<S>`
- `where(bool test(T event)) → Stream<T>`

## [StreamController][]

This controller allows sending data, error and done events on its stream.

- `StreamController({void onListen()?, void onPause()?, void onResume()?, FutureOr<void> onCancel()?, bool sync = false})`
- `StreamController.broadcast({void onListen()?, void onCancel()?, bool sync = false})`

- `done → Future`
- `sink → StreamSink<T>`
- `stream → Stream<T>`

- `add(T event) → void`
- `addError(Object error, [StackTrace? stackTrace]) → void`
- `addStream(Stream<T> source, {bool? cancelOnError}) → Future`
- `close() → Future`

## [StreamSink][]

A StreamSink combines the methods from StreamConsumer and EventSink.

- `done → Future`

- `add(S event) → void`
- `addError(Object error, [StackTrace? stackTrace]) → void`
- `addStream(Stream<S> stream) → Future`
- `close() → Future`

## [StreamSubscription][]

When you listen on a Stream using Stream.listen, a StreamSubscription object is returned.

- `asFuture<E>([E? futureValue]) → Future<E>`
- `cancel() → Future<void>`
- `pause([Future<void>? resumeSignal]) → void`
- `resume() → void`

## [StreamTransformer][]

Conceptually, a transformer is simply a function from Stream to Stream that is encapsulated into a class.

All other transforming methods on Stream, such as Stream.map, Stream.where or Stream.expand can be implemented using Stream.transform

## [Timer][]

A count-down timer that can be configured to fire once or repeatedly.

- `Timer(Duration duration, void callback())`
- `Timer.periodic(Duration duration, void callback(Timer timer))`

- `isActive → bool`
- `tick → int`

- `cancel() → void`

- `run(void callback()) → void`

## [Zone][]

Code is always executed in the context of a zone, available as `Zone.current`. The initial main function runs in the context of the default zone (`Zone.root`). Code can be run in a different zone using either runZoned, to create a new zone, or `Zone.run` to run code in the context of an existing zone which was created earlier using `Zone.fork`.

- `fork({ZoneSpecification? specification, Map<Object?, Object?>? zoneValues}) → Zone`
- `run<R>(R action()) → R`
- `runBinary<R, T1, T2>(R action(T1 argument1, T2 argument2), T1 argument1, T2 argument2) → R`
- `runGuarded(void action()) → void`
- `scheduleMicrotask(void callback()) → void`


[Completer]: https://api.dart.dev/stable/2.14.4/dart-async/Completer-class.html
[EventSink]: https://api.dart.dev/stable/2.14.4/dart-async/EventSink-class.html
[Future]: https://api.dart.dev/stable/2.14.4/dart-async/Future-class.html
[FutureOr]: https://api.dart.dev/stable/2.14.4/dart-async/FutureOr-class.html
[MultiStreamController]: https://api.dart.dev/stable/2.14.4/dart-async/MultiStreamController-class.html
[Stream]: https://api.dart.dev/stable/2.14.4/dart-async/Stream-class.html
[StreamController]: https://api.dart.dev/stable/2.14.4/dart-async/StreamController-class.html
[StreamSink]: https://api.dart.dev/stable/2.14.4/dart-async/StreamSink-class.html
[StreamSubscription]: https://api.dart.dev/stable/2.14.4/dart-async/StreamSubscription-class.html
[StreamTransformer]: https://api.dart.dev/stable/2.14.4/dart-async/StreamTransformer-class.html
[Timer]: https://api.dart.dev/stable/2.14.4/dart-async/Timer-class.html
[Zone]: https://api.dart.dev/stable/2.14.4/dart-async/Zone-class.html
