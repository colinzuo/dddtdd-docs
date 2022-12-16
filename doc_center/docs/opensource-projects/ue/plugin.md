
## [How to create Unreal Engine plugins][]

### Code in Plugins

When **generating project files** for Visual Studio or Xcode, any Plugins that have Source folders (containing .Build.cs files) will be **added to your project files** to make it easier to navigate to their source code.

UE4 supports interdependent Modules and Plugins. Project Modules can **depend on Plugins by enabling** the Plugins in its .uproject file. Similarly, Plugins **indicate dependency by enabling** other Plugins within their own .uplugin files.

### Distributing a Plugin on the Epic Marketplace

To package your Plugin, click the *Package...* link to package your Plugin into a folder for distribution.

### Module Descriptors

"Type" sets the type of Module. Valid options are Runtime, RuntimeNoCommandlet, Developer, Editor, EditorNoCommandlet, and Program. This type determines which types of applications can load the Module. For example, some plugins may include modules that should only load when the Editor is running. Runtime modules will be loaded in all cases, even in shipped games. 

## [Integrating third-party libraries into Unreal Engine][]

```csharp
  Type = ModuleType.External;

  // Add any macros that need to be set
  PublicDefinitions.Add("WITH_MYTHIRDPARTYLIBRARY=1");

  // Add any include paths for the plugin
  PublicIncludePaths.Add(Path.Combine(ModuleDirectory, "inc"));

  // Add any import libraries or static libraries
  PublicAdditionalLibraries.Add(Path.Combine(ModuleDirectory, "lib", "foo.a"));
```

The **ModuleType.External** setting tells the engine not to look for (or compile) source code. It will use the other settings you define in that file by adding the listed include paths to the compile environment, setting the appropriate macros, and linking against the given static libraries.

### Runtime Dependencies

```csharp
  // This assumes that the DLL already exists in the given directory, and that the plugin will manually load it from that location
  RuntimeDependencies.Add(Path.Combine(PluginDirectory, "Binaries/Win64/Foo.dll"));

  // If you want to have the DLL copied to the same output directory as the executable at build time
  RuntimeDependencies.Add("$(TargetOutputDir)/Foo.dll", Path.Combine  (PluginDirectory, "Source/ThirdParty/bin/Foo.dll"));

  // you can also use it to inject additional files into the staging process
  RuntimeDependencies.Add(Path.Combine(PluginDirectory, "Extras/..."), StagedFileType.UFS);
```

### Troubleshooting

```cpp
// Windows macros for TRUE and FALSE are not portable and are redefined to a value that causes a compile error if used.
#include "Windows/AllowWindowsPlatformTypes.h"
int Foo = TRUE;
#include "Windows/HideWindowsPlatformTypes.h"

// The Unreal Engine codebase has many warnings treated as errors by default.
THIRD_PARTY_INCLUDES_START
#include <openssl.h>
THIRD_PARTY_INCLUDES_END

// For legacy reasons, Unreal Engine forces 4-byte packing on Win32
PRAGMA_PUSH_PLATFORM_DEFAULT_PACKING
#include <thirdparty.h>
PRAGMA_POP_PLATFORM_DEFAULT_PACKING
```

## 参考文章

### UE4 Plugins

<http://kantandev.com/articles/ue4-plugins>

不同于寻常plugin，UE4的plugin更多是一种组织代码的方式。

#### Plugin content

In the editor, ensure you have Show Plugin Content enabled in the content browser view options, and you should see a content folder visible for your plugin. You can then create whatever assets you need there.

### UE4 Code Modules

<http://kantandev.com/articles/ue4-code-modules>

### [Best Practices for Creating and Using Plugins][]

git clone，然后在ue4的界面选refresh project可以让visual studio发现新的代码


[Best Practices for Creating and Using Plugins]: https://learn.unrealengine.com/course/2436528

[How to create Unreal Engine plugins]: https://docs.unrealengine.com/en-US/ProductionPipelines/Plugins/index.html

[Integrating third-party libraries into Unreal Engine]: https://docs.unrealengine.com/en-US/ProductionPipelines/BuildTools/UnrealBuildTool/ThirdPartyLibraries/index.html
