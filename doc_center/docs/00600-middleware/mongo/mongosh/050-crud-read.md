
## Read All Documents in a Collection

```shell
use sample_mflix

db.movies.find()
```

## Specify Equality Condition

```shell
use sample_mflix

db.movies.find( { "title": "Titanic" } )
```

## Specify Conditions Using Query Operators

```shell
use sample_mflix

db.movies.find( { rated: { $in: [ "PG", "PG-13" ] } } )
```

## Specify Logical Operators (AND / OR)

```shell
use sample_mflix

db.movies.find( { countries: "Mexico", "imdb.rating": { $gte: 7 } } )
```

```shell
use sample_mflix

db.movies.find( {
     year: 2010,
     $or: [ { "awards.wins": { $gte: 5 } }, { genres: "Drama" } ]
} )
```
