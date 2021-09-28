---
title: 插件
sidebar_position: 4
---

<https://flutter.dev/docs/development/packages-and-plugins/using-packages>
<https://flutter.dev/docs/development/packages-and-plugins/developing-packages>

<https://dart.dev/guides/libraries/create-library-packages>

## Using packages

### Packages

At a minimum, a Dart package is a directory containing a pubspec file. Additionally, a package can contain dependencies (listed in the pubspec), Dart libraries, apps, resources, tests, images, and examples

### Plugins

A plugin package is a special kind of package that makes **platform functionality** available to the app

### Conflict resolution

```yaml
dependency_overrides:
  url_launcher: '5.4.0'
```

### Updating package dependencies

To upgrade to a new version of the package, for example to use new features in that package, run flutter pub upgrade (Upgrade dependencies in IntelliJ or Android Studio) to retrieve the highest available version of the package that is allowed by the version constraint specified in pubspec.yaml.

### Dependencies on unpublished packages

```yaml
dependencies:
  plugin1:
    path: ../plugin1/
```

```yaml
dependencies:
  package1:
    git:
      url: git://github.com/flutter/packages.git
      ref: some-branch
      path: packages/package1
```

## Developing packages & plugins

The plugin API has been updated and now supports federated plugins that enable separation of different platform implementations. You can also now indicate which platforms a plugin supports, for example web and macOS.

[Writing a good Flutter plugin](https://medium.com/flutter/writing-a-good-flutter-plugin-1a561b986c9c)

### Developing Dart packages

```bash
flutter create --template=package hello
```

### Flutter Federated plugins

#### app-facing package

The package that plugin **users depend on** to use the plugin. This package specifies the API used by the Flutter app

#### platform package

One or more packages that contain the platform-specific implementation code. The app-facing package calls into these packages—they **aren’t included into an app**, unless they contain platform-specific functionality accessible to the end user.

#### platform interface package

The package that glues the app-facing packing to the platform package(s). This package declares **an interface that any platform package must implement** to support the app-facing package. Having a single package that defines this interface ensures that all platform packages implement the same functionality in a uniform way.

#### Non-endorsed federated plugin

 A developer can still use your implementation, but must **manually add the plugin** to the app’s pubspec file

[How To Write a Flutter Web Plugin: Part 2](https://medium.com/flutter/how-to-write-a-flutter-web-plugin-part-2-afdddb69ece6)

The main difference between the old way of writing Flutter plugins and the new way is that platform-specific implementations are in different packages. We call a plugin implemented in this way a federated plugin.

### Specifying a plugin’s supported platforms

```yaml
flutter:
  plugin:
    platforms:
      android:
        package: com.example.hello
        pluginClass: HelloPlugin
      ios:
        pluginClass: HelloPlugin
      macos:
        pluginClass: HelloPlugin
      web:
        pluginClass: HelloPlugin
        fileName: hello_web.dart
```

```bash
flutter create --org com.example --template=plugin --platforms=android,ios -a java hello
```

### Add support for platforms in an existing plugin project

```bash
flutter create --template=plugin --platforms=web .
```

## Dart package

### lib directory

As you might expect, the library code lives under the lib directory and is public to other packages. You can create any hierarchy under lib, as needed. By convention, **implementation code is placed under lib/src**. Code under lib/src is considered private; other packages should never need to import src/.... To make APIs under lib/src public, you can export lib/src files from a file that’s directly under lib.

Create a “main” library file directly under lib, `lib/<package-name>.dart`, that exports all of the public APIs. This allows the user to get all of a library’s functionality by importing a single file.

The lib directory **might also include other importable, non-src, libraries**. For example, perhaps your main library works across platforms, but you create separate libraries that rely on dart:io or dart:html. Some packages have separate libraries that are meant to be imported with a prefix, when the main library is not.

For the best performance when developing with dartdevc, put implementation files under /lib/src, instead of elsewhere under /lib. Also, **avoid imports of package:package_name/src/....**

### Importing library files

When importing a library file from your own package, use a relative path when both files are inside of lib, or when both files are outside of lib. Use package: when the imported file is in lib and the importer is outside.

### Conditionally importing and exporting library files

```dart
export 'src/hw_none.dart' // Stub implementation
    if (dart.library.io) 'src/hw_io.dart' // dart:io implementation
    if (dart.library.html) 'src/hw_html.dart'; // dart:html implementation    
```

### Providing additional files

A well-designed library package is easy to test. We recommend that you write tests using the test package, placing the test code in the **test directory** at the top of the package.

If you create any command-line tools intended for public consumption, place those in the **bin directory**, which is public. Enable running a tool from the command line, using dart pub global activate. Listing the tool in the executables section of the pubspec allows a user to run it directly without calling dart pub global run.

It’s helpful if you include an example of how to use your library. This goes into the **example directory** at the top of the package.

Any tools or executables that you create during development that aren’t for public use go into the **tool directory**.

### Package layout conventions

<https://dart.dev/tools/pub/package-layout>

If you want to organize your public libraries, you can also create subdirectories inside lib. If you do that, users will specify that path when they import it

The libraries inside lib are publicly visible: other packages are free to import them. But much of a package’s code is internal implementation libraries that should only be imported and used by the package itself. Those go inside a subdirectory of lib called src. You can create subdirectories in there if it helps you organize things.

When you use libraries from within your own package, even code in src, you can (and should) still use package: to import them

For web packages, place entrypoint code—Dart scripts that include main() and supporting files, such as CSS or HTML—under web. You can organize the web directory into subdirectories if you like.

Every package should have tests. With pub, the convention is that these go in a test directory (or some directory inside it if you like) and have **_test at the end of their file names**.
