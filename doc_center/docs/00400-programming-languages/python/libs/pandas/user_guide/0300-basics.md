# Essential basic functionality

## Attributes and underlying data

Note, these attributes can be safely assigned to!

```py
df.columns = [x.lower() for x in df.columns]
```

To get the actual data inside a `Index` or `Series`, use the `.array` property

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
