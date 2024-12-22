
```shell
db

use video

db.movies.insertOne(movie)

db.movies.find().pretty()

db.movies.findOne()

db.movies.updateOne({title: "Star Wars"}, {$set: {reviews: []}})

db.movies.deleteOne({title: "Star Wars"})

db.movies.deleteMany({title: "Star Wars"})
```

## database

```js
use myDB

db.createCollection()

db.getCollectionInfos()
```

## document

### dot notation

```text
// array
"<array>.<index>"

// object
"<embedded document>.<field>"
```

### Other Uses of the Document Structure

#### Query Filter Documents

```
{
  <field1>: <value1>,
  <field2>: { <operator>: <value> },
  ...
}
```

#### Update Specification Documents

``` 
{
  <operator1>: { <field1>: <value1>, ... },
  <operator2>: { <field2>: <value2>, ... },
  ...
}
```

#### Index Specification Documents

``` 
{ <field1>: <type1>, <field2>: <type2>, ...  }
```

## Query API

## insert

- <https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne>
- <https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany>

```
db.movies.insertOne(
  {
    title: "The Favourite",
    genres: [ "Drama", "History" ],
    runtime: 121,
    rated: "R",
    year: 2018,
    directors: [ "Yorgos Lanthimos" ],
    cast: [ "Olivia Colman", "Emma Stone", "Rachel Weisz" ],
    type: "movie"
  }
)

db.movies.insertMany([
   ***
])

db.myNewCollection3.createIndex( { y: 1 } )
```

### query

- <https://www.mongodb.com/docs/manual/reference/method/db.collection.find>

```
db.movies.find()

// Equality
db.movies.find( { "title": "Titanic" } )

// Operators
db.movies.find( { rated: { $in: [ "PG", "PG-13" ] } } ) 

// and
db.movies.find( { countries: "Mexico", "imdb.rating": { $gte: 7 } } )

// or
db.movies.find( {
     year: 2010,
     $or: [ { "awards.wins": { $gte: 5 } }, { genres: "Drama" } ]
} )
```

#### Array

```
// equality
db.inventory.find( { tags: ["red", "blank"] } )

// without regard to order or other elements in the array
db.inventory.find( { tags: { $all: ["red", "blank"] } } )

// at least one element with the specified value
db.inventory.find( { tags: "red" } )

// elements that in some combination satisfy the query conditions
db.inventory.find( { dim_cm: { $gt: 15, $lt: 20 } } )

// at least one array element satisfies all the specified criteria
db.inventory.find( { dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } } )

// element at a particular index
db.inventory.find( { "dim_cm.1": { $gt: 25 } } )

// number of elements
db.inventory.find( { "tags": { $size: 3 } } )

// Equality matches on the whole embedded/nested document require 
// an exact match of the specified document, including the field order
db.inventory.find( { "instock": { warehouse: "A", qty: 5 } } )

// Condition on a Field Embedded in an Array of Documents
db.inventory.find( { 'instock.qty': { $lte: 20 } } )

db.inventory.find( { 'instock.0.qty': { $lte: 20 } } )

// Multiple Query Conditions on Nested Fields
db.inventory.find( { "instock": { $elemMatch: { qty: 5, warehouse: "A" } } } )
```

#### Project Fields

```
db.inventory.find( { status: "A" }, { item: 1, status: 1 } )

db.inventory.find( { status: "A" }, { item: 1, status: 1, _id: 0 } )

db.inventory.find( { status: "A" }, { status: 0, instock: 0 } )

db.inventory.find(
   { status: "A" },
   { item: 1, status: 1, "size.uom": 1 }
)

db.inventory.find(
   { status: "A" },
   { "size.uom": 0 }
)

db.inventory.find( { status: "A" }, { item: 1, status: 1, "instock.qty": 1 } )

db.inventory.find( { status: "A" }, { item: 1, status: 1, instock: { $slice: -1 } } )
```
### Update

- <https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne>
- <https://www.mongodb.com/docs/manual/reference/method/db.collection.updateMany>
- <https://www.mongodb.com/docs/manual/reference/method/db.collection.replaceOne>

```
{
  <update operator>: { <field1>: <value1>, ... },
  <update operator>: { <field2>: <value2>, ... },
  ...
} 

db.movies.updateOne( { title: "Tag" },
{
  $set: {
    plot: "One month every year, five highly competitive friends
           hit the ground running for a no-holds-barred game of tag"
  }
  { $currentDate: { lastUpdated: true } }
})

db.listingsAndReviews.updateMany(
  { security_deposit: { $lt: 100 } },
  {
    $set: { security_deposit: 100, minimum_nights: 1 }
  }
)

// replace the entire content of a document except for the _id field
db.accounts.replaceOne(
  { account_id: 371138 },
  { account_id: 893421, limit: 5000, products: [ "Investment", "Brokerage" ] }
)
```

### Delete

- <https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteOne>
- <https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteMany>

``` 
db.movies.deleteMany({})

db.movies.deleteOne( { cast: "Brad Pitt" } )

db.movies.deleteMany( { title: "Titanic" } )
```

## Aggregation

``` 
db.<collection>.aggregate([
  {
    <$stage1>
  },
  {
    <$stage2>
  }
  ...
])

db.movies.aggregate([

  // First Stage

  { $project: { _id: 0, genres: 1, imdb: 1, title: 1 } },

  // Second Stage

  { $unwind: "$genres" },

  // Third Stage

  { $group:
    { _id: "$genres",
      averageGenreRating: { $avg: "$imdb.rating" }
    }
  },

   // Fourth Stage

   { $sort: { averageGenreRating: -1 } }
] )
```

## delete

```
movies_coll.delete_one({"id": 4})

movies_coll.delete_many({"year": 1984})

movies_coll.drop()
```

