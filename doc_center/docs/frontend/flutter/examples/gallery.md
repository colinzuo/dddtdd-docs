
# GalleryApp

<https://github.com/flutter/gallery>

## _ModelBindingScope extends InheritedWidget

通过InheritedWidget提供GalleryOptions

## Builder

通过Builder提供context

## MaterialApp

配置
- restorationScopeId: 使能restoration

- themeMode
- theme
- darkTheme

- localizationsDelegates
- supportedLocales
- locale
- localeResolutionCallback

- initialRoute
- onGenerateRoute

### onGenerateRoute

用正则遍历找第一个满足条件的path，然后用对应的builder创建Route

```dart
  static Route<dynamic> onGenerateRoute(RouteSettings settings) {
    for (final path in paths) {
      final regExpPattern = RegExp(path.pattern);
      if (regExpPattern.hasMatch(settings.name)) {
        final firstMatch = regExpPattern.firstMatch(settings.name);
        final match = (firstMatch.groupCount == 1) ? firstMatch.group(1) : null;
        if (kIsWeb) {
          return NoAnimationMaterialPageRoute<void>(
            builder: (context) => path.builder(context, match),
            settings: settings,
          );
        }
        return MaterialPageRoute<void>(
          builder: (context) => path.builder(context, match),
          settings: settings,
        );
      }
    }
```

## RootPage

```dart
    return const ApplyTextOptions(
      child: SplashPage(
        child: Backdrop(),
      ),
    );
```

## Backdrop

```dart
    _settingsPage = widget.settingsPage ??
        SettingsPage(
          animationController: _settingsPanelController,
        );
    _homePage = widget.homePage ?? const HomePage();
```

## SettingsPage

### SettingsListItem

- title
- selectedOption
- optionsMap
- onOptionChanged
- onTapSetting
- isExpanded

### DisplayOption

- title
- subtitle

## ReplyApp

```dart
const String homeRoute = '/reply';

    Path(
        r'^' + reply_routes.homeRoute,
        // ignore: prefer_const_constructors
        (context, match) =>
            const StudyWrapper(study: reply.ReplyApp(), hasBottomNavBar: true)),
```

### StudyWrapper

封装了
- MediaQuery: Creates a widget that provides `[MediaQueryData]` to its descendants
- Directionality: Creates a widget that determines the directionality of text and text-direction-sensitive render objects
- Stack.RestorationScope.child: 具体路由
- Stack.FloatingActionButton: back button

### _ReplyAppState

#### MultiProvider

提供EmailStore

#### MaterialApp

- navigatorKey: 嵌套一层navigator

