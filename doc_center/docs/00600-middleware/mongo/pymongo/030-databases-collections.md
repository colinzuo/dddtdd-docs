# Databases and Collections

## Access a Database

```py
database = client["test_database"]
```

## Access a Collection

```py
database = client["test_database"]
collection = database["test_collection"]
```

## Create a Collection

```py
database = client["test_database"]
database.create_collection("example_collection")
```

## Delete a Collection

```py
collection = database["test_collection"];
collection.drop();
```
