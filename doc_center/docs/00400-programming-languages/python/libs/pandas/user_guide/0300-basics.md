# Essential basic functionality

## Attributes and underlying data

Note, these attributes can be safely assigned to!

```py
df.columns = [x.lower() for x in df.columns]
```

To get the actual data inside a `Index` or `Series`, use the `.array` property
`array` will always be an `ExtensionArray`

```py
s.array

s.index.array
```

If you know you need a NumPy array, use `to_numpy()` or `numpy.asarray()`.

```py
s.to_numpy()

np.asarray(s)
```

## Accelerated operations

pandas has support for accelerating certain types of binary numerical and boolean operations using the `numexpr` library and the `bottleneck` libraries

## Descriptive statistics

```py
df.mean(0)

df.mean(1)

ts_stand = (df - df.mean()) / df.std()
```

### Index of min/max values

```py
s1.idxmin(), s1.idxmax()

df1.idxmin(axis=0)
```

### Value counts (histogramming) / mode

```py
s.value_counts()

s5.mode()
```

### Discretization and quantiling

```py
factor = pd.cut(arr, 4)

factor = pd.cut(arr, [-5, -1, 0, 1, 5])

factor = pd.qcut(arr, [0, 0.25, 0.5, 0.75, 1])
```

## Function application

### Row or column-wise function application

```py
df.apply(lambda x: np.mean(x))

df.apply(lambda x: np.mean(x), axis=1)

df.apply(lambda x: x.max() - x.min())

df.apply(np.cumsum)

df.apply(np.exp)

tsdf.apply(lambda x: x.idxmax())

df_udf.apply(subtract_and_divide, args=(5,), divide=3)

tsdf.apply(pd.Series.interpolate)
```

## Reindexing and altering labels

```py
s.reindex(["e", "b", "f", "d"])

df.reindex(index=["c", "f", "b"], columns=["three", "two", "one"])

rs = s.reindex(df.index)
```

### Dropping labels from an axis

```py
df.drop(["a", "d"], axis=0)

df.drop(["one"], axis=1)
```

## Iteration

When iterating over a `Series`, it is regarded as **array-like**, and basic iteration produces the values. `DataFrames` follow the **dict-like** convention of iterating over the “keys” of the objects

- Series: values
- DataFrame: column labels

- `iterrows()`: Iterate over the rows of a DataFrame as (index, Series) pairs. This converts the rows to Series objects, which can change the dtypes and has some performance implications.

- `itertuples()`: Iterate over the rows of a DataFrame as namedtuples of the values. This is a lot faster than iterrows(), and is in most cases preferable to use to iterate over the values of a DataFrame

## Sorting

### By index

```py
unsorted_df.sort_index()

unsorted_df.sort_index(ascending=False)

unsorted_df.sort_index(axis=1)
```

### By values

The optional by parameter to `DataFrame.sort_values()` may used to specify one or more columns to use to determine the sorted order

```py
df1.sort_values(by="two")

df1[["one", "two", "three"]].sort_values(by=["one", "two"])

s1.sort_values(key=lambda x: x.str.lower())

df.sort_values(by="a", key=lambda col: col.str.lower())
```

### smallest / largest values

Series has the `nsmallest()` and `nlargest()` methods which return the smallest or largest 
 values


```py
s.nsmallest(3)

df.nlargest(3, "a")

df.nlargest(5, ["a", "c"])
```

## dtypes

### astype

```py
df3.astype("float32").dtypes

dft[["a", "b"]] = dft[["a", "b"]].astype(np.uint8)

dft1 = dft1.astype({"a": np.bool_, "c": np.float64})
```
