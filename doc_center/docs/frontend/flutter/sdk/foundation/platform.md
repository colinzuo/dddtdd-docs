
```dart
import '_platform_io.dart'
  if (dart.library.html) '_platform_web.dart' as _platform;
  
/// The [TargetPlatform] that matches the platform on which the framework is
/// currently executing.

/// This is the default value of [ThemeData.platform] (hence the name). Widgets
/// from the material library should use [Theme.of] to determine the current
/// platform for styling purposes, rather than using [defaultTargetPlatform].

/// In a test environment, the platform returned is [TargetPlatform.android]
/// regardless of the host platform. 

/// Tests can also create specific platform tests by and adding a `variant:`
/// argument to the test and using a [TargetPlatformVariant].

TargetPlatform get defaultTargetPlatform => _platform.defaultTargetPlatform;
```