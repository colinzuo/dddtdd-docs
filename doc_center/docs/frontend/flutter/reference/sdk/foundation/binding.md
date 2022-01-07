
**singleton services**，比如**WidgetsFlutterBinding**

```dart
/// Base class for mixins that provide singleton services (also known as
/// "bindings").

/// The top-most layer used to write the application will have a concrete class
/// that inherits from [BindingBase] and uses all the various [BindingBase]
/// mixins (such as [ServicesBinding]). For example, the Widgets library in
/// Flutter introduces a binding called [WidgetsFlutterBinding]. The relevant
/// library defines how to create the binding. It could be implied (for example,
/// [WidgetsFlutterBinding] is automatically started from [runApp])

abstract class BindingBase {

```



