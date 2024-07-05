
## Go Data Structures: Interfaces

[https://research.swtch.com/interfaces](https://research.swtch.com/interfaces)

### Usage

Go's interfaces let you use [duck typing](https://en.wikipedia.org/wiki/Duck_typing) like you would in a purely dynamic language like Python but still have the compiler catch obvious mistakes like passing an int where an object with a Read method was expected, or like calling the Read method with the wrong number of arguments

### Interface Values

Interface values are represented as a two-word pair giving a pointer to information about the type stored in the interface and a pointer to the associated data

The first word in the interface value points at what I call an **interface table or itable** (pronounced i-table; in the runtime sources, the C implementation name is `Itab`). The itable begins with some metadata about the types involved and then becomes a list of function pointers. **Note that the itable corresponds to the interface type, not the dynamic type**. In terms of our example, the itable for Stringer holding type Binary lists the methods used to satisfy Stringer, which is just String: Binary's other methods (Get) make no appearance in the itable

The second word in the interface value points at the actual data, in this case a **copy** of b. 

To check whether an interface value holds a particular type, as in the type switch above, the Go compiler generates code equivalent to the C expression `s.tab->type` to obtain the type pointer and check it against the desired type

To call s.String(), the Go compiler generates code that does the equivalent of the C expression `s.tab->fun[0](s.data)`: it calls the appropriate function pointer from the itable, passing the interface value's data word as the function's first (in this example, only) argument.

### Computing the Itable

the compiler generates a type description structure for each **concrete type** like `Binary` or `int` or `func(map[int]string)`. Among other metadata, the type description structure contains a list of the methods implemented by that type

the compiler generates a (different) type description structure for each **interface type** like Stringer; it too contains a method list

The **interface runtime** computes the itable by looking for each method listed in the interface type's method table in the concrete type's method table. The runtime caches the itable after generating it, so that this correspondence need only be computed once

By sorting the two method tables and walking them simultaneously, we can build the mapping in `O(ni + nt)` time instead

### Memory Optimizations

First, if the interface type involved is empty—it has no methods—then the itable serves no purpose except to hold the pointer to the original type. In this case, the itable can be dropped and the value can **point at the type directly**

Second, if the value associated with the interface value can fit in a single machine word, there's **no need to introduce the indirection** or the heap allocation
