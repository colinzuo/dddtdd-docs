
## SharedPointer.h

```c++
 *	This library contains the following smart pointers:
 *
 *		TSharedRef - Non-nullable, reference counted non-intrusive authoritative smart pointer
 *		TSharedPtr - Reference counted non-intrusive authoritative smart pointer
 *		TWeakPtr - Reference counted non-intrusive weak pointer reference
 *
 *
 *	Additionally, the following helper classes and functions are defined:
 *
 *		MakeShareable() - Used to initialize shared pointers from C++ pointers (enables implicit conversion)
 *		TSharedFromThis - You can derive your own class from this to acquire a TSharedRef from "this"
 *		StaticCastSharedRef() - Static cast utility function, typically used to downcast to a derived type. 
 *		ConstCastSharedRef() - Converts a 'const' reference to 'mutable' smart reference
 *		StaticCastSharedPtr() - Dynamic cast utility function, typically used to downcast to a derived type. 
 *		ConstCastSharedPtr() - Converts a 'const' smart pointer to 'mutable' smart pointer
```
