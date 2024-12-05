# Intro to data structures

## Series

```py
s = pd.Series(data, index=index)
```

### From ndarray

If data is an `ndarray`, index must be the **same length** as data. If no index is passed, one will be created having values `[0, ..., len(data) - 1]`.

```py
s = pd.Series(np.random.randn(5), index=["a", "b", "c", "d", "e"])

pd.Series(np.random.randn(5))
```

### From dict

```py
d = {"b": 1, "a": 0, "c": 2}

pd.Series(d)

pd.Series(d, index=["b", "c", "d", "a"])
```

### From scalar value

```py
pd.Series(5.0, index=["a", "b", "c", "d", "e"])
```

### Series is ndarray-like

Series acts very similarly to a ndarray and is a **valid argument to most NumPy functions**

```py
s.iloc[0]

s.iloc[:3]

s[s > s.median()]

s.iloc[[4, 3, 1]]

np.exp(s)

s.to_numpy()
```

```py
s.dtype
```

This is often a NumPy dtype. However, pandas and 3rd-party libraries extend NumPy’s type system in a few places, in which case the dtype would be an `ExtensionDtype`. Some examples within pandas are `Categorical data` and `Nullable integer data type`.

```py
s.array
```

`Series.array` will always be an `ExtensionArray`. Briefly, an `ExtensionArray` is a thin wrapper around one or more concrete arrays like a `numpy.ndarray`

### Series is dict-like

A Series is also like a **fixed-size dict** in that you can get and set values by **index label**:

```py
s["a"]

s["e"] = 12.0
```

Using the `Series.get()` method, a missing label will return `None` or specified default:

```py
s.get("f")

s.get("f", np.nan)
```

### Vectorized operations and label alignment with Series

```py
s + s

s * 2

np.exp(s)
```

A key difference between `Series` and `ndarray` is that operations between `Series` automatically **align the data based on label**

```py
s.iloc[1:] + s.iloc[:-1]
```

### Name attribute

```py
s = pd.Series(np.random.randn(5), name="something")

s2 = s.rename("different")
```

## DataFrame

### From dict of Series or dicts

The resulting **index** will be the **union** of the indexes of the various `Series`. If there are any nested dicts, these will first be converted to `Series`. If no columns are passed, the columns will be the ordered list of dict keys

```py
d = {
    "one": pd.Series([1.0, 2.0, 3.0], index=["a", "b", "c"]),
    "two": pd.Series([1.0, 2.0, 3.0, 4.0], index=["a", "b", "c", "d"]),
}

df = pd.DataFrame(d)

pd.DataFrame(d, index=["d", "b", "a"])

pd.DataFrame(d, index=["d", "b", "a"], columns=["two", "three"])

df.index

df.columns
```

### From dict of ndarrays / lists

All ndarrays must share the **same length**. 

```py
d = {"one": [1.0, 2.0, 3.0, 4.0], "two": [4.0, 3.0, 2.0, 1.0]}

pd.DataFrame(d)

pd.DataFrame(d, index=["a", "b", "c", "d"])
```

### From structured or record array

```py
data = np.zeros((2,), dtype=[("A", "i4"), ("B", "f4"), ("C", "a10")])

data[:] = [(1, 2.0, "Hello"), (2, 3.0, "World")]

pd.DataFrame(data)

pd.DataFrame(data, index=["first", "second"])

pd.DataFrame(data, columns=["C", "A", "B"])
```

### From a list of dicts

```py
data2 = [{"a": 1, "b": 2}, {"a": 5, "b": 10, "c": 20}]

pd.DataFrame(data2)

pd.DataFrame(data2, index=["first", "second"])

pd.DataFrame(data2, columns=["a", "b"])
```

### From a Series

```py
ser = pd.Series(range(3), index=list("abc"), name="ser")

pd.DataFrame(ser)
```

### DataFrame.from_dict

```py
In [68]: pd.DataFrame.from_dict(dict([("A", [1, 2, 3]), ("B", [4, 5, 6])]))
Out[68]: 
   A  B
0  1  4
1  2  5
2  3  6
```

```py
In [69]: pd.DataFrame.from_dict(
   ....:     dict([("A", [1, 2, 3]), ("B", [4, 5, 6])]),
   ....:     orient="index",
   ....:     columns=["one", "two", "three"],
   ....: )
   ....: 
Out[69]: 
   one  two  three
A    1    2      3
B    4    5      6
```

### DataFrame.from_records

```py
In [70]: data
Out[70]: 
array([(1, 2., b'Hello'), (2, 3., b'World')],
      dtype=[('A', '<i4'), ('B', '<f4'), ('C', 'S10')])

In [71]: pd.DataFrame.from_records(data, index="C")
Out[71]: 
          A    B
C               
b'Hello'  1  2.0
b'World'  2  3.0
```

### Column selection, addition, deletion

Getting, setting, and deleting columns works with the **same syntax as the analogous dict** operations:

```py
df["one"]

df["three"] = df["one"] * df["two"]

df["flag"] = df["one"] > 2
```

```py
del df["two"]

three = df.pop("three")
```

```py
df.insert(1, "bar", df["one"])
```

### Indexing / selection

```py
df[col]

df.loc[label]

df.iloc[loc]

df[5:10]

df[bool_vec]
```
