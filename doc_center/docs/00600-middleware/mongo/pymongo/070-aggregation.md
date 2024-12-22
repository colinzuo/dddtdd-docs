# Transform Your Data with Aggregation

```py
pipeline = [
    { "$match": { "cuisine": "Bakery" } },
    { "$group": { "_id": "$borough", "count": { "$sum": 1 } } }
]
# Execute the aggregation
aggCursor = collection.aggregate(pipeline)
```

## Filtered Subset

```py
pipeline.append({
    "$match": {
        "vocation": "ENGINEER"
    }
})

pipeline.append({
    "$sort": {
        "dateofbirth": -1
    }
})

pipeline.append({
    "$limit": 3
})

pipeline.append({
    "$unset": [
        "_id",
        "address"
    ]
})

aggregation_result = person_coll.aggregate(pipeline)
```

## Group and Total

```py
pipeline.append({
    "$match": {
        "orderdate": {
            "$gte": datetime(2020, 1, 1, 0, 0, 0),
            "$lt": datetime(2021, 1, 1, 0, 0, 0)
        }
    }
})

pipeline.append({
    "$sort": {
        "orderdate": 1
    }
})

pipeline.append({
    "$group": {
        "_id": "$customer_id",
        "first_purchase_date": {"$first": "$orderdate"},
        "total_value": {"$sum": "$value"},
        "total_orders": {"$sum": 1},
        "orders": {"$push": {"orderdate": "$orderdate", "value": "$value"}}
    }
})

pipeline.append({
    "$sort": {
        "first_purchase_date": 1
    }
})

pipeline.append({
    "$set": {
        "customer_id": "$_id"
    }
})

pipeline.append({"$unset": ["_id"]})

aggregation_result = orders_coll.aggregate(pipeline)
```

## Unpack Arrays and Group

```py
pipeline.append({
    "$unwind": {
        "path": "$products"
    }
})

pipeline.append({
    "$match": {
        "products.price": {
            "$gt": 15
        }
    }
})

pipeline.append({
    "$group": {
        "_id": "$products.prod_id",
        "product": {"$first": "$products.name"},
        "total_value": {"$sum": "$products.price"},
        "quantity": {"$sum": 1}
    }
})

pipeline.append({
    "$set": {
        "product_id": "$_id"
    }
})

pipeline.append({"$unset": ["_id"]})

aggregation_result = orders_coll.aggregate(pipeline)
```

## One-to-One Join

```py
pipeline.append({
    "$match": {
        "orderdate": {
            "$gte": datetime(2020, 1, 1, 0, 0, 0),
            "$lt": datetime(2021, 1, 1, 0, 0, 0)
        }
    }
})

pipeline.append({
    "$lookup": {
        "from": "products",
        "localField": "product_id",
        "foreignField": "id",
        "as": "product_mapping"
    }
})

pipeline.extend([
    {
        "$set": {
            "product_mapping": {"$first": "$product_mapping"}
        }
    },
    {
        "$set": {
            "product_name": "$product_mapping.name",
            "product_category": "$product_mapping.category"
        }
    }
])

pipeline.append({"$unset": ["_id", "product_id", "product_mapping"]})

aggregation_result = orders_coll.aggregate(pipeline)
```

## Multi-Field Join

```py
embedded_pl = [
    {
        "$match": {
            "$expr": {
                "$and": [
                    {"$eq": ["$product_name", "$$prdname"]},
                    {"$eq": ["$product_variation", "$$prdvartn"]}
                ]
            }
        }
    }
]

embedded_pl.append({
    "$match": {
        "orderdate": {
            "$gte": datetime(2020, 1, 1, 0, 0, 0),
            "$lt": datetime(2021, 1, 1, 0, 0, 0)
        }
    }
})

embedded_pl.append({
    "$unset": ["_id", "product_name", "product_variation"]
})

pipeline.append({
    "$lookup": {
        "from": "orders",
        "let": {
            "prdname": "$name",
            "prdvartn": "$variation"
        },
        "pipeline": embedded_pl,
        "as": "orders"
    }
})

pipeline.append({
    "$match": {
        "orders": {"$ne": []}
    }
})

pipeline.append({
    "$unset": ["_id", "description"]
})

aggregation_result = products_coll.aggregate(pipeline)
```
