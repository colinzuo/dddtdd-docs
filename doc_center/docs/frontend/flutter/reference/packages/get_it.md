
<https://pub.dev/packages/get_it>

```dart
getIt.registerSingleton<AppModel>(AppModelImplementation());
getIt.registerLazySingleton<RESTAPI>(() =>RestAPIImplementation());

// if you want to work just with the singleton:
GetIt.instance.registerSingleton<AppModel>(AppModelImplementation());
GetIt.I.registerLazySingleton<RESTAPI>(() =>RestAPIImplementation());

/// `AppModel` and `RESTAPI` are both abstract base classes in this example

var myAppModel = getIt.get<AppModel>();

var myAppModel = getIt<AppModel>();

// as Singleton:
var myAppModel = GetIt.instance<AppModel>();
var myAppModel = GetIt.I<AppModel>();

void registerFactory<T>(FactoryFunc<T> func)

void registerSingleton<T>(T instance)

void registerLazySingleton<T>(FactoryFunc<T> func)

/// Unregister an [instance] of an object or a factory/singleton by Type [T] or by name [instanceName]
/// if you need to dispose some resources before the reset, you can
/// provide a [disposingFunction]. This function overrides the disposing
/// you might have provided when registering.
void unregister<T>({Object instance,String instanceName, void Function(T) disposingFunction})

  getIt.registerSingletonAsync<ConfigService>(() async {
    final configService = ConfigService();
    await configService.init();
    return configService;
  });

  getIt.registerSingletonAsync<RestService>(() async => RestService().init());

  getIt.registerSingletonAsync<DbService>(createDbServiceAsync,
      dependsOn: [ConfigService]);

  getIt.registerSingletonWithDependencies<AppModel>(
      () => AppModelImplmentation(),
      dependsOn: [ConfigService, DbService, RestService]);
```