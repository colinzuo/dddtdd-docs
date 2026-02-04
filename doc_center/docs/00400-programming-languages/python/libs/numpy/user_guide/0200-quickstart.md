
## The basics

- `ndarray.ndim`
- `ndarray.shape`
- `ndarray.size`
- `ndarray.dtype`
- `ndarray.itemsize`
- `ndarray.data`

### Array creation

```py
import numpy as np
a = np.array([2, 3, 4])
a.dtype
dtype('int64')

b = np.array([1.2, 3.5, 5.1])
b.dtype
dtype('float64')
```

```py
np.zeros((3, 4))

np.ones((2, 3, 4), dtype=np.int16)

np.arange(10, 30, 5)

np.linspace(0, 2, 9)
```

### Universal functions

NumPy provides familiar mathematical functions such as sin, cos, and exp. In NumPy, these are called **“universal functions” (ufunc)**. Within NumPy, these functions operate **elementwise** on an array, producing an array as output

## Copies and views

### View or shallow copy

```py
c = a.view()

c.base is a 

c.flags.owndata

c = c.reshape((2, 6))

c[0, 4] = 1234
```

Slicing an array returns a view of it

```py
s = a[:, 1:3]
s[:] = 10
```

### Deep copy

The `copy` method makes a complete copy of the array and its data

```py
d = a.copy()
```
