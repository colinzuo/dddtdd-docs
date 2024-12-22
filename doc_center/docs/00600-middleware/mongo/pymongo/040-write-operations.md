# Write Data to MongoDB

## Insert Documents

### Insert One Document

```py
sample_restaurants.restaurants.insert_one({"name" : "Mongo's Burgers"})
```

### Insert Multiple Documents

```py
document_list = [
   { "name" : "Mongo's Burgers" },
   { "name" : "Mongo's Pizza" }
]

sample_restaurants.restaurants.insert_many(document_list)
```

## Update Documents

### Update One Document

```py
restaurants = database["restaurants"]

query_filter = {'name' : 'Bagels N Buns'}
update_operation = { '$set' : 
    { 'name' : '2 Bagels 2 Buns' }
}

result = restaurants.update_one(query_filter, update_operation)
```

### Update Many Documents

```py
restaurants = database["restaurants"]

query_filter = {'cuisine' : 'Pizza'}
update_operation = { '$set' : 
    { 'cuisine' : 'Pasta' }
}

result = restaurants.update_many(query_filter, update_operation)
```

## Replace Documents

```py
restaurants = database["restaurants"]

query_filter = {"name" : "Pizza Town"}
replace_document = { "name" : "Mongo's Pizza",
                     "cuisine" : "Pizza",
                     "address" : {
                         "street" : "123 Pizza St",
                         "zipCode" : "10003"
                     },
                     "borough" : "Manhattan"
                   }

result = restaurants.replace_one(query_filter, replace_document)
```

## Delete Documents

```py
query_filter = { "name": "Ready Penny Inn" }

result = restaurants.delete_one(query_filter)
```

```py
query_filter = { "borough": "Brooklyn" }

result = restaurants.delete_many(query_filter)
```

## transactions

In MongoDB, transactions run within **logical sessions**. A session is a grouping of related read or write operations that you intend to run sequentially. Sessions enable **causal consistency** for a group of operations and allow you to run operations in an **ACID-compliant transaction**, which is a transaction that meets an expectation of atomicity, consistency, isolation, and durability.

### Methods

- `start_session()`
- `start_transaction()`
- `abort_transaction()`
- `commit_transaction()`
- `with_transaction()`
- `end_session()`

### Example

```py
# Establishes a connection to the MongoDB server
client = MongoClient("<connection string>")

# Defines the database and collection
restaurants_db = client["sample_restaurants"]
restaurants_collection = restaurants_db["restaurants"]

# Function performs the transaction
def insert_documents(session):
    restaurants_collection_with_session = restaurants_collection.with_options(
        write_concern=WriteConcern("majority"),
        read_concern=ReadConcern("local")
    )
    
    # Inserts documents within the transaction
    restaurants_collection_with_session.insert_one(
        {"name": "PyMongo Pizza", "cuisine": "Pizza"}, session=session
    )
    restaurants_collection_with_session.insert_one(
        {"name": "PyMongo Burger", "cuisine": "Burger"}, session=session
    )

# Starts a client session
with client.start_session() as session:
    try:
        # Uses the with_transaction method to start a transaction, execute the callback, and commit (or abort on error).
        session.with_transaction(insert_documents)
        print("Transaction succeeded")
    except (ConnectionFailure, OperationFailure) as e:
        print(f"Transaction failed: {e}")

# Closes the client connection
client.close()
```


