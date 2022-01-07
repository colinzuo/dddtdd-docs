

Since the Bloc class extends Cubit, we have access to the current state of the bloc at any point in time via the state getter.

Blocs should never directly emit new states. Instead every state change must be output in response to an incoming event within mapEventToState

Both blocs and cubits will ignore duplicate states. If we yield or emit State nextState where state == nextState, then no state change will occur.

## 参考文档

<https://www.didierboelens.com/2018/12/reactive-programming-streams-bloc-practical-use-cases/>

<https://bloclibrary.dev/#/architecture>

<https://github.com/boeledi/blocs>

<https://github.com/brianegan/flutter_architecture_samples/tree/master/bloc_library>

<https://bloclibrary.dev/#/flutterlogintutorial>

## 代码片段

```dart
import 'dart:async';

import 'package:rxdart/rxdart.dart';
import 'package:rxdart/subjects.dart';


```