
```dart
/// Returns true if none of the foundation library debug variables have been
/// changed.

bool debugAssertAllFoundationVarsUnset(String reason, { DebugPrintCallback debugPrintOverride = debugPrintThrottled }) {


/// Boolean value indicating whether [debugInstrumentAction] will instrument
/// actions in debug builds.
bool debugInstrumentationEnabled = false;

/// Runs the specified [action], timing how long the action takes in debug
/// builds when [debugInstrumentationEnabled] is true.

Future<T> debugInstrumentAction<T>(String description, Future<T> Function() action) async {

/// Configure [debugFormatDouble] using [num.toStringAsPrecision].

int? debugDoublePrecision;

/// Formats a double to have standard formatting.

String debugFormatDouble(double? value) {

/// A setting that can be used to override the platform [Brightness] exposed
/// from [BindingBase.platformDispatcher].

ui.Brightness? debugBrightnessOverride;

/// The address for the active DevTools server used for debugging this
/// application.
String? activeDevToolsServerAddress;

/// The uri for the connected vm service protocol.
String? connectedVmServiceUri;
```
