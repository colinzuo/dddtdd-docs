
## [Stream-class][]

A Stream provides a way to receive a sequence of events. Each event is either a data event, also called an element of the stream, or an error event, which is a notification that something has failed. When a stream has emitted all its event, a single "done" event will notify the listener that the end has been reached.

There are two kinds of streams: "Single-subscription" streams and "broadcast" streams.

If several listeners want to listen to a single subscription stream, use asBroadcastStream to create a broadcast stream on top of the non-broadcast stream.

If a listener is added to a broadcast stream while an event is being fired, that listener will not receive the event currently being fired. If a listener is canceled, it immediately stops receiving events.

When the "done" event is fired, subscribers are unsubscribed before receiving the event. After the event has been sent, the stream has no subscribers. Adding new subscribers to a broadcast stream after this point is allowed, but they will just receive a new "done" event as soon as possible.

[Stream-class]: https://api.dart.dev/stable/2.13.4/dart-async/Stream-class.html
