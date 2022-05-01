
## Error codes and responses

<https://developer.twitter.com/en/docs/twitter-ads-api/response-codes>

## Response codes and errors

<https://developer.twitter.com/en/support/twitter-api/error-troubleshooting>

## Tweets lookup

<https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets>

### tweets

`GET /2/tweets`

Endpoint URL

`https://api.twitter.com/2/tweets`

OAuth 2.0 scopes required by this endpoint

- tweet.read
- users.read

Example responses

```json
{
  "data": [
    {
      "id": "1261326399320715264",
      "text": "Tune in to the @MongoDB @Twitch stream featuring our very own @suhemparack to learn about Twitter Developer Labs - starting now! https://t.co/fAWpYi3o5O"
    },
    {
      "id": "1278347468690915330",
      "text": "Good news and bad news: nn2020 is half over"
    }
  ]
}
```

## Likes

<https://developer.twitter.com/en/docs/twitter-api/tweets/likes/api-reference/get-tweets-id-liking_users>

### liking_users

`GET /2/tweets/:id/liking_users`

Endpoint URL

`https://api.twitter.com/2/tweets/:id/liking_users`

OAuth 2.0 scopes required by this endpoint

- tweet.read
- users.read
- like.read

Example responses

```json
{
  "data": [
    {
      "id": "1065249714214457345",
      "name": "Spaces",
      "username": "TwitterSpaces"
    },
    {
      "id": "783214",
      "name": "Twitter",
      "username": "Twitter"
    }
  ]
}
```

### likes

`POST /2/users/:id/likes`

Endpoint URL

`https://api.twitter.com/2/users/:id/likes`

OAuth 2.0 scopes required by this endpoint

- tweet.read
- users.read
- like.write

Example responses

```
{
  "data": {
    "liked": true
  }
}
```
