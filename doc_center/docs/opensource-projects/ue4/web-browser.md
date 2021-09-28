
## UMG WebBrowser

<https://docs.unrealengine.com/en-US/InteractiveExperiences/UMG/UserGuide/WidgetTypeReference/WebBrowser/index.html>

## Plugins WebBrowserWidget

<https://docs.unrealengine.com/en-US/API/Plugins/WebBrowserWidget/index.html>

## BlueprintAPI WebBrowser

<https://docs.unrealengine.com/en-US/BlueprintAPI/WebBrowser/index.html>

## Runtime WebBrowser

<https://docs.unrealengine.com/en-US/API/Runtime/WebBrowser/index.html>

### IWebBrowserWindow

- BindUObject: <https://docs.unrealengine.com/en-US/API/Runtime/WebBrowser/IWebBrowserWindow/BindUObject/index.html>

Expose a UObject instance to the browser runtime. Properties and Functions will be accessible from JavaScript side. As all communication with the rendering procesis asynchronous, return values (both for properties and function results) are wrapped into JS Future objects.

使用示例如下  
<https://answers.unrealengine.com/questions/495638/how-to-bind-uobject-to-webbrowser.html>  
<https://programmer.help/blogs/ue4-ue4-embedded-web-and-communication-with-web.html>

- ExecuteJavascript: <https://docs.unrealengine.com/en-US/API/Runtime/WebBrowser/IWebBrowserWindow/ExecuteJavascript/index.html>

- GetDocumentLoadingState
- GetTitle
- GetUrl
- LoadURL

- UnbindUObject

## 培训视频

[Unreal Engine 4 Tutorial - Web Browser](https://www.youtube.com/watch?v=k3hlRvGXi68)  
[UE4 Tutorial | 3D Widget Web Browser In-game](https://www.youtube.com/watch?v=ODvbDVZ2AOc)