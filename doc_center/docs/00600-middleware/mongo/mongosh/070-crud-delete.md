# Delete Documents

## Delete All Documents

```shell
use sample_mflix

db.movies.deleteMany({})
```

## Delete All Documents that Match a Condition

```shell
use sample_mflix

db.movies.deleteMany( { title: "Titanic" } )
```

## Delete Only One Document that Matches a Condition

```shell
use sample_mflix

db.movies.deleteOne( { cast: "Brad Pitt" } )
```
