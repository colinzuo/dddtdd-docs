# Read Data from MongoDB

## Specify a Query

### Exact Match

```py
results = collection.find({ "color": "yellow" })
```

### Comparison Operators

- `$gt`: Greater than
- `$lte`: Less than or Equal
- `$ne`: Not equal

```py
results = collection.find({ "rating": { "$gt" : 2 }})
```

### Logical Operators

- `$and`, which returns all documents that match the conditions of all clauses
- `$or`, which returns all documents that match the conditions of one clause
- `$nor`, which returns all documents that do not match the conditions of any clause
- `$not`, which returns all documents that do not match the expression

```py
results = collection.find({ 
    "$or": [
        { "qty": { "$gt": 5 }},
        { "color": "yellow" }
    ]
})
```

### Array Operators

- `$all`, which returns documents with arrays that contain all elements in the query
- `$elemMatch`, which returns documents if an element in their array field matches all conditions in the query
- `$size`, which returns all documents with arrays of a specified size

```py
cursor = db.inventory.find({"tags": {"$all": ["red", "blank"]}})
```

```py
cursor = db.inventory.find({"dim_cm": {"$elemMatch": {"$gt": 22, "$lt": 30}}})
```

```py
results = collection.find({
    "type" : { "$size": 2 }
})
```

### Arrays of Embedded Documents

```py
cursor = db.inventory.find({"instock": {"warehouse": "A", "qty": 5}})
```

```py
cursor = db.inventory.find({"instock.qty": {"$lte": 20}})
```

```py
cursor = db.inventory.find({"instock": {"$elemMatch": {"qty": 5, "warehouse": "A"}}})
```

```py
cursor = db.inventory.find({"instock": {"$elemMatch": {"qty": {"$gt": 10, "$lte": 20}}}})
```

```py
cursor = db.inventory.find({"instock.qty": {"$gt": 10, "$lte": 20}})
```

### Element Operators

```py
results = collection.find( { "color" : { "$exists": "true" }} )
```

### Evaluation Operators

- `$text`, which performs a text search on the documents
- `$regex`, which returns documents that match a specified regular expression
- `$mod`, which performs a modulo operation on the value of a field and returns documents where the remainder is a specified value

```py
results = collection.find({ "name" : { "$regex" : "p{2,}" }} )
```

## Retrieve Data

```py
restaurant = sample_restaurants.restaurants.find_one({"cuisine": "Bakery"})
```

```py
cursor = sample_restaurants.restaurants.find({"cuisine": "Spanish"})
```

## Specify Fields To Return

### Specify Fields to Include

```py
{ "<Field Name>": 1 }
```

```py
results = restaurants.find({ "name" : "Emerald Pub"}, {"name": 1, "cuisine": 1, "borough": 1})
```

### Exclude the _id Field

```py
results = restaurants.find({ "name" : "Emerald Pub"}, {"_id": 0, "name": 1, "cuisine": 1, "borough": 1})
```

### Specify Fields to Exclude

```py
{ "<Field Name>": 0 }
```

## Specify Documents to Return

```py
results = restaurants.find({ "cuisine" : "Italian"}) \
                     .sort("name", pymongo.ASCENDING) \
                     .limit(5) \
                     .skip(10)
```

:::note
The order in which you call these methods doesn't change the documents that are returned. The driver automatically reorders the calls to perform the sort and skip operations first, and the limit operation afterward
:::

## Count Documents

```py
collection.count_documents({ "author": "Mike" })
```

## Retrieve Distinct Field Values

```py
results = restaurants.distinct("borough")

results = restaurants.distinct("borough", {
    "cuisine": "Italian"
})
```

## Access Data From a Cursor

```py
results = collection.find()

for document in results:
    print(document)

print(results.next())

all_results = list(results)

results.close()
```
