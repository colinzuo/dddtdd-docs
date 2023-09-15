---
title: Memory Management
---

Memory management in Python involves a **private heap containing all Python objects and data structures**. The management of this private heap is ensured internally by the Python memory manager

On top of the raw memory allocator, several **object-specific allocators** operate on the same heap and implement distinct memory management policies adapted to the peculiarities of every object type

## Allocator Domains

All allocating functions belong to one of three different “domains”

- Raw domain: intended for allocating memory for general-purpose memory buffers where the allocation must go to the system allocator or where the allocator can operate without the GIL. The memory is requested directly to the system.
- “Mem” domain: intended for allocating memory for Python buffers and general-purpose memory buffers where the allocation must be performed with the GIL held. The memory is taken from the Python private heap.
- Object domain: intended for allocating memory belonging to Python objects. The memory is taken from the Python private heap.

## Raw Memory Interface

- `void *PyMem_RawMalloc(size_t n)`
- `void *PyMem_RawCalloc(size_t nelem, size_t elsize)`
- `void *PyMem_RawRealloc(void *p, size_t n)`
- `void PyMem_RawFree(void *p)`

## Memory Interface

- `void *PyMem_Malloc(size_t n)`
- `void *PyMem_Calloc(size_t nelem, size_t elsize)`
- `void *PyMem_Realloc(void *p, size_t n)`
- `void PyMem_Free(void *p)`
- `PyMem_New(TYPE, n)`
- `PyMem_Resize(p, TYPE, n)`
- `void PyMem_Del(void *p)`

## Object allocators

- `void *PyObject_Malloc(size_t n)`
- `void *PyObject_Calloc(size_t nelem, size_t elsize)`
- `void *PyObject_Realloc(void *p, size_t n)`
- `void PyObject_Free(void *p)`

## The pymalloc allocator

Python has a pymalloc allocator optimized for small objects (smaller or equal to 512 bytes) with a short lifetime. It uses memory mappings called “arenas” with a fixed size of 256 KiB. It falls back to `PyMem_RawMalloc()` and `PyMem_RawRealloc()` for allocations larger than 512 bytes.
