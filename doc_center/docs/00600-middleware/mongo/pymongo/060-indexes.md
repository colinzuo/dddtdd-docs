# Optimize Queries with Indexes

## Remove an Index

### Remove a Single Index

```py
movies.drop_index("_title_")
```

### Remove All Indexes

```py
collection.drop_indexes()
```

## Single Field Index

```py
result = collection.create_index("<field name>")
```

## Compound Index

```py
result = collection.create_index([
    ("<field name one>", pymongo.ASCENDING),
    ("<field name two>", pymongo.ASCENDING)
])
```

## Unique Index

```py
result = collection.create_index("<field name>", unique=True)
```

## Remove an Index

```py
collection.drop_index("<index_name>")
```


