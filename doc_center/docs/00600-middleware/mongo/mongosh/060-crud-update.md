# Update Documents

## Update Operator Syntax

```shell
{
  <update operator>: { <field1>: <value1>, ... },
  <update operator>: { <field2>: <value2>, ... },
  ...
}
```

## Update a Single Document

```shell
use sample_mflix

db.movies.updateOne( { title: "Twilight" },
{
  $set: {
    plot: "A teenage girl risks everything–including her life–when she falls in love with a vampire."
  },
  $currentDate: { lastUpdated: true }
})
```

## Update Multiple Documents

```shell
use sample_airbnb

db.listingsAndReviews.updateMany(
  { security_deposit: { $lt: 100 } },
  {
    $set: { security_deposit: 100, minimum_nights: 1 }
  }
)
```

## Replace a Document

```shell
db.accounts.replaceOne(
  { account_id: 371138 },
  { account_id: 893421, limit: 5000, products: [ "Investment", "Brokerage" ] }
)
```
