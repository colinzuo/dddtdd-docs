
## [TBaseDynamicDelegate](https://docs.unrealengine.com/en-US/API/Runtime/Core/Delegates/TBaseDynamicDelegate/index.html)

Dynamic delegate template class (UObject-based, serializable). You'll use the various **DECLARE_DYNAMIC_DELEGATE** macros to create the actual delegate type, templated to the function signature the delegate is compatible with. Then, you can create an instance of that class when you want to assign functions to the delegate.

## [TBaseDynamicMulticastDelegate](https://docs.unrealengine.com/en-US/API/Runtime/Core/Delegates/TBaseDynamicMulticastDelegate/index.html)

Dynamic multi-cast delegate template class (UObject-based, serializable). You'll use the various DECLARE_DYNAMIC_MULTICAST_DELEGATE macros to create the actual delegate type, templated to the function signature the delegate is compatible with. Then, you can create an instance of that class when you want to assign functions to the delegate.

## [TDelegate](https://docs.unrealengine.com/en-US/API/Runtime/Core/Delegates/TDelegate/index.html)

Unicast delegate template class.

Use the various DECLARE_DELEGATE macros to create the actual delegate type, templated to the function signature the delegate is compatible with. Then, you can create an instance of that class when you want to bind a function to the delegate.

## [TMulticastDelegate](https://docs.unrealengine.com/en-US/API/Runtime/Core/Delegates/TMulticastDelegate/index.html)

Multicast delegate template base class, used for both normal and event multicast delegates.

This class implements the functionality of multicast delegates. It is templated to the function signature that it is compatible with. Use the various DECLARE_MULTICAST_DELEGATE and DECLARE_EVENT macros to create actual delegate types.

Multicast delegates offer no guarantees for the calling order of bound functions. As bindings get added and removed over time, the calling order may change. Only bindings without return values are supported.

