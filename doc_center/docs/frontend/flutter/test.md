---
title: 测试
sidebar_position: 3
---

## An introduction to unit testing

[An introduction to unit testing](https://flutter.dev/docs/cookbook/testing/unit/introduction)

## Mock dependencies using Mockito

[Mock dependencies using Mockito](https://flutter.dev/docs/cookbook/testing/unit/mocking)

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'package:mocking/main.dart';

import 'fetch_album_test.mocks.dart';

// Generate a MockClient using the Mockito package.
// Create new instances of this class in each test.
@GenerateMocks([http.Client])
void main() {
  group('fetchAlbum', () {
    test('returns an Album if the http call completes successfully', () async {
      final client = MockClient();

      // Use Mockito to return a successful response when it calls the
      // provided http.Client.
      when(client
              .get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1')))
          .thenAnswer((_) async =>
              http.Response('{"userId": 1, "id": 2, "title": "mock"}', 200));

      expect(await fetchAlbum(client), isA<Album>());
    });

    test('throws an exception if the http call completes with an error', () {
      final client = MockClient();

      // Use Mockito to return an unsuccessful response when it calls the
      // provided http.Client.
      when(client
              .get(Uri.parse('https://jsonplaceholder.typicode.com/albums/1')))
          .thenAnswer((_) async => http.Response('Not Found', 404));

      expect(fetchAlbum(client), throwsException);
    });
  });
}
```

```bash
flutter pub run build_runner build
```

## An introduction to widget testing

[An introduction to widget testing](https://flutter.dev/docs/cookbook/testing/widget/introduction)

The flutter_test package provides the following tools for testing widgets:

+ The WidgetTester allows building and interacting with widgets in a test environment.
+ The testWidgets() function automatically creates a new WidgetTester for each test case, and is used in place of the normal test() function.
+ The Finder classes allow searching for widgets in the test environment.
+ Widget-specific Matcher constants help verify whether a Finder locates a widget or multiple widgets in the test environment.

```yaml
dev_dependencies:
  test: <latest_version>
  flutter_test:
    sdk: flutter
  mockito: <newest_version>
  build_runner: <newest_version>
```

<https://pub.dev/packages/test>

<https://api.flutter.dev/flutter/flutter_test/flutter_test-library.html>

<https://api.flutter.dev/flutter/flutter_test/WidgetTester-class.html>

<https://api.flutter.dev/flutter/flutter_test/testWidgets.html>

<https://api.flutter.dev/flutter/flutter_test/Finder-class.html>

<https://api.flutter.dev/flutter/flutter_test/CommonFinders-class.html>

- ancestor: Finds widgets that are ancestors of the of parameter and that match the matching parameter.
```dart
expect(
  tester.widget<Opacity>(
    find.ancestor(
      of: find.text('faded'),
      matching: find.byType('Opacity'),
    )
  ).opacity,
  0.5
);
```
- byKey: Finds widgets by searching for one with a particular Key
  `expect(find.byKey(backKey), findsOneWidget);`
- byType: Finds widgets by searching for widgets with a particular type
  `expect(find.byType(IconButton), findsOneWidget);`
- descendant: Finds widgets that are descendants of the of parameter and that match the matching parameter
```dart
expect(find.descendant(
  of: find.widgetWithText(Row, 'label_1'), matching: find.text('value_1')
), findsOneWidget);
```
- text: Finds Text and EditableText widgets containing string equal to the text argument
  `expect(find.text('Back'), findsOneWidget);`
- textContaining: Finds Text and EditableText widgets which contain the given pattern argument
  `expect(find.textContain('Back'), findsOneWidget);`
  `expect(find.textContain(RegExp(r'(\w+)')), findsOneWidget);`
- widgetWithText: Looks for widgets that contain a Text descendant with text in it.
  `tester.tap(find.widgetWithText(Button, 'Update'));`

<https://api.flutter.dev/flutter/package-matcher_matcher/Matcher-class.html>

- findsNothing: matches no widgets in the widget tree
- findsWidgets: locates at least one widget in the widget tree
- findsOneWidget: locates at exactly one widget in the widget tree
- findsNWidgets: locates the specified number of widgets in the widget tree
- throwsFlutterError
- throwsAssertionError
- isInstanceOf
- moreOrLessEquals
- 

<https://flutter.dev/docs/cookbook/testing/widget/tap-drag>

## Integration testing

[Integration testing](https://flutter.dev/docs/testing/integration-tests)

Tests written with the integration_test package can:

+ Run directly on the target device, allowing you to test on multiple Android or iOS devices using Firebase Test Lab.
+ Run using flutter_driver.
+ Use flutter_test APIs, making integration tests more like writing widget tests.

```yaml
dev_dependencies:
  integration_test:
    sdk: flutter
  flutter_test:
    sdk: flutter
  flutter_driver:
    sdk: flutter
```

```bash
flutter drive \
  --driver=test_driver/integration_test.dart \
  --target=integration_test/foo_test.dart \
  -d <DEVICE_ID>
```

## [flutter_driver-library][]

### Finder

- Ancestor
- BySemanticsLabel
- ByText
- ByTooltipMessage
- ByType
- ByValueKey
- CommonFinders
- Descendant
- PageBack
- SerializableFinder

### Condition

- CombinedCondition
- FirstFrameRasterized
- NoPendingFrame
- NoPendingPlatformMessages
- NoTransientCallbacks
- SerializableWaitCondition

### State

- DriverOffset
- FlutterWebConnection
- Health
- RenderTree
- Timeline
- TimelineEvent
- TimelineSummary

### Command

- Command
- CommandWithTarget
- DiagnosticsTreeResult
- EnterText
- GetDiagnosticsTree
- GetHealth
- GetOffset
- GetOffsetResult
- GetRenderTree
- GetSemanticsId
- GetSemanticsIdResult
- GetText
- GetTextResult
- RequestData
- RequestDataResult
- Result
- Scroll
- ScrollIntoView
- SetFrameSync
- SetSemantics
- SetSemanticsResult
- SetTextEntryEmulation
- Tap
- WaitFor
- WaitForAbsent
- WaitForCondition

[flutter_driver-library]: https://api.flutter.dev/flutter/flutter_driver/flutter_driver-library.html