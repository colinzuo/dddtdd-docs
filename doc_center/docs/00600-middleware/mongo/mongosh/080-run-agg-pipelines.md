# Run Aggregation Pipelines

Common uses for aggregation include:

- Grouping data by a given expression.
- Calculating results based on multiple fields and storing those results in a new field.
- Filtering data to return a subset that matches a given criteria.
- Sorting data.

## Understand the Aggregation Syntax

```shell
db.<collection>.aggregate([
  {
    <$stage1>
  },
  {
    <$stage2>
  }
  ...
])
```

## Example

```shell
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
