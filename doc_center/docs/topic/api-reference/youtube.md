
## Videos

<https://developers.google.com/youtube/v3/docs/videos>

### Resource representation

```json
{
  "kind": "youtube#video",
  "etag": etag,
  "id": string,
  "snippet": {
    "publishedAt": datetime,
    "channelId": string,
    "title": string,
    "description": string,
    "thumbnails": {
      (key): {
        "url": string,
        "width": unsigned integer,
        "height": unsigned integer
      }
    },
    "channelTitle": string,
    "tags": [
      string
    ],
    "categoryId": string,
    "liveBroadcastContent": string,
    "defaultLanguage": string,
    "localized": {
      "title": string,
      "description": string
    },
    "defaultAudioLanguage": string
  },
  "contentDetails": {
    "duration": string,
    "dimension": string,
    "definition": string,
    "caption": string,
    "licensedContent": boolean,
    "regionRestriction": {
      "allowed": [
        string
      ],
      "blocked": [
        string
      ]
    },
    "contentRating": {
      "acbRating": string,
      "agcomRating": string,
      "anatelRating": string,
      "bbfcRating": string,
      "bfvcRating": string,
      "bmukkRating": string,
      "catvRating": string,
      "catvfrRating": string,
      "cbfcRating": string,
      "cccRating": string,
      "cceRating": string,
      "chfilmRating": string,
      "chvrsRating": string,
      "cicfRating": string,
      "cnaRating": string,
      "cncRating": string,
      "csaRating": string,
      "cscfRating": string,
      "czfilmRating": string,
      "djctqRating": string,
      "djctqRatingReasons": [,
        string
      ],
      "ecbmctRating": string,
      "eefilmRating": string,
      "egfilmRating": string,
      "eirinRating": string,
      "fcbmRating": string,
      "fcoRating": string,
      "fmocRating": string,
      "fpbRating": string,
      "fpbRatingReasons": [,
        string
      ],
      "fskRating": string,
      "grfilmRating": string,
      "icaaRating": string,
      "ifcoRating": string,
      "ilfilmRating": string,
      "incaaRating": string,
      "kfcbRating": string,
      "kijkwijzerRating": string,
      "kmrbRating": string,
      "lsfRating": string,
      "mccaaRating": string,
      "mccypRating": string,
      "mcstRating": string,
      "mdaRating": string,
      "medietilsynetRating": string,
      "mekuRating": string,
      "mibacRating": string,
      "mocRating": string,
      "moctwRating": string,
      "mpaaRating": string,
      "mpaatRating": string,
      "mtrcbRating": string,
      "nbcRating": string,
      "nbcplRating": string,
      "nfrcRating": string,
      "nfvcbRating": string,
      "nkclvRating": string,
      "oflcRating": string,
      "pefilmRating": string,
      "rcnofRating": string,
      "resorteviolenciaRating": string,
      "rtcRating": string,
      "rteRating": string,
      "russiaRating": string,
      "skfilmRating": string,
      "smaisRating": string,
      "smsaRating": string,
      "tvpgRating": string,
      "ytRating": string
    },
    "projection": string,
    "hasCustomThumbnail": boolean
  },
  "status": {
    "uploadStatus": string,
    "failureReason": string,
    "rejectionReason": string,
    "privacyStatus": string,
    "publishAt": datetime,
    "license": string,
    "embeddable": boolean,
    "publicStatsViewable": boolean,
    "madeForKids": boolean,
    "selfDeclaredMadeForKids": boolean
  },
  "statistics": {
    "viewCount": unsigned long,
    "likeCount": unsigned long,
    "dislikeCount": unsigned long,
    "favoriteCount": unsigned long,
    "commentCount": unsigned long
  },
  "player": {
    "embedHtml": string,
    "embedHeight": long,
    "embedWidth": long
  },
  "topicDetails": {
    "topicIds": [
      string
    ],
    "relevantTopicIds": [
      string
    ],
    "topicCategories": [
      string
    ]
  },
  "recordingDetails": {
    "recordingDate": datetime
  },
  "fileDetails": {
    "fileName": string,
    "fileSize": unsigned long,
    "fileType": string,
    "container": string,
    "videoStreams": [
      {
        "widthPixels": unsigned integer,
        "heightPixels": unsigned integer,
        "frameRateFps": double,
        "aspectRatio": double,
        "codec": string,
        "bitrateBps": unsigned long,
        "rotation": string,
        "vendor": string
      }
    ],
    "audioStreams": [
      {
        "channelCount": unsigned integer,
        "codec": string,
        "bitrateBps": unsigned long,
        "vendor": string
      }
    ],
    "durationMs": unsigned long,
    "bitrateBps": unsigned long,
    "creationTime": string
  },
  "processingDetails": {
    "processingStatus": string,
    "processingProgress": {
      "partsTotal": unsigned long,
      "partsProcessed": unsigned long,
      "timeLeftMs": unsigned long
    },
    "processingFailureReason": string,
    "fileDetailsAvailability": string,
    "processingIssuesAvailability": string,
    "tagSuggestionsAvailability": string,
    "editorSuggestionsAvailability": string,
    "thumbnailsAvailability": string
  },
  "suggestions": {
    "processingErrors": [
      string
    ],
    "processingWarnings": [
      string
    ],
    "processingHints": [
      string
    ],
    "tagSuggestions": [
      {
        "tag": string,
        "categoryRestricts": [
          string
        ]
      }
    ],
    "editorSuggestions": [
      string
    ]
  },
  "liveStreamingDetails": {
    "actualStartTime": datetime,
    "actualEndTime": datetime,
    "scheduledStartTime": datetime,
    "scheduledEndTime": datetime,
    "concurrentViewers": unsigned long,
    "activeLiveChatId": string
  },
  "localizations": {
    (key): {
      "title": string,
      "description": string
    }
  }
}
```

### Videos: insert 

Quota impact: A call to this method has a quota cost of 1600 units

`POST https://www.googleapis.com/upload/youtube/v3/videos`

#### Authorization

Requires one of Scope
- https://www.googleapis.com/auth/youtube.upload
- https://www.googleapis.com/auth/youtube
- https://www.googleapis.com/auth/youtubepartner
- https://www.googleapis.com/auth/youtube.force-ssl

### Videos: list

Quota impact: A call to this method has a quota cost of 1 unit.

#### Parameters

- part: The part parameter specifies a comma-separated list of one or more **video resource properties** that the API response will include.

#### Filters (specify exactly one of the following parameters)

- chart: The chart parameter identifies the chart that you want to retrieve.
- id: The id parameter specifies a comma-separated list of the YouTube video ID(s) for the resource(s) that are being retrieved. In a video resource, the id property specifies the video's ID.
- myRating: This parameter can only be used in a properly authorized request. Set this parameter's value to like or dislike to instruct the API to only return videos liked or disliked by the authenticated user

#### Optional parameters

- maxResults: The maxResults parameter specifies the maximum number of items that should be returned in the result set.
- pageToken: The pageToken parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved.

#### Response

```json
{
  "kind": "youtube#videoListResponse",
  "etag": etag,
  "nextPageToken": string,
  "prevPageToken": string,
  "pageInfo": {
    "totalResults": integer,
    "resultsPerPage": integer
  },
  "items": [
    video Resource
  ]
}
```

#### Error Response

```json
{
  "error": {
    "code": 400,
    "message": "The request specifies unexpected pagination parameters.",
    "errors": [
      {
        "message": "The request specifies unexpected pagination parameters.",
        "domain": "youtube.parameter",
        "reason": "unexpectedParameter",
        "location": "maxResults,pageToken",
        "locationType": "parameter"
      }
    ]
  }
}
```

#### list (multiple video IDs)

- part: snippet,contentDetails,statistics
- id: Ks-_Mh1QhMc,c0KYU2j0TM4,eIho2S0ZahI

```json
{
  "kind": "youtube#videoListResponse",
  "etag": "29rPITt2Np51MP8ju4BqDi4MKH8",
  "items": [
    {
      "kind": "youtube#video",
      "etag": "-wfOH1fYmI2lSwZXJHEbOU-Ghdw",
      "id": "Ks-_Mh1QhMc",
      "snippet": {

      },
      "contentDetails": {

      },
      "statistics": {

      }
    },
    {

    },
    {

    }
  ],
  "pageInfo": {
    "totalResults": 3,
    "resultsPerPage": 3
  }
}

```



### Videos: update

Quota impact: A call to this method has a quota cost of 50 units

`PUT https://www.googleapis.com/youtube/v3/videos`

### Videos: delete

Quota impact: A call to this method has a quota cost of 50 units

`DELETE https://www.googleapis.com/youtube/v3/videos`


## CommentThreads

A commentThread resource contains information about a YouTube comment thread, which comprises a top-level comment and replies, if any exist, to that comment. A commentThread resource can represent comments about either a video or a channel.

Both the top-level comment and the replies are actually comment resources nested inside the commentThread resource

### Resource representation

```json
{
  "kind": "youtube#commentThread",
  "etag": etag,
  "id": string,
  "snippet": {
    "channelId": string,
    "videoId": string,
    "topLevelComment": comments Resource,
    "canReply": boolean,
    "totalReplyCount": unsigned integer,
    "isPublic": boolean
  },
  "replies": {
    "comments": [
      comments Resource
    ]
  }
}
```

### Comments: insert

Quota impact: A call to this method has a quota cost of 50 units

`POST https://www.googleapis.com/youtube/v3/commentThreads`

### CommentThreads: list

Quota impact: A call to this method has a quota cost of 1 unit

`GET https://www.googleapis.com/youtube/v3/commentThreads`

#### Parameters

- part: The part parameter specifies a comma-separated list of one or more commentThread resource properties that the API response will include.

#### Filters (specify exactly one of the following parameters)

- channelId
- videoId

#### Optional parameters

- maxResults
- order: The order parameter specifies the order in which the API response should list comment threads. 
Valid values are:
time - Comment threads are ordered by time. This is the default behavior.
relevance - Comment threads are ordered by relevance.
- pageToken
- searchTerms

#### Response

```json
{
  "kind": "youtube#commentThreadListResponse",
  "etag": "9HKhMmtHkoCAo2vTI3pGFKXd7K4",
  "nextPageToken": "QURTSl9pMDEyRTAyNU9tNG1RNmhzeEUtYVY4R0NCYmpVcFdHeTZCTEdSTGpRVmhjOHVPbjVXanFRLXdNVlJzZkQ0MzQtQ2ZFUmFYTHRxVQ==",
  "pageInfo": {
    "totalResults": 20,
    "resultsPerPage": 20
  },
  "items": [
    {
      "kind": "youtube#commentThread",
      "etag": "djyprqBrganFs9DLy8oGo52RKMo",
      "id": "UgzNOjdmfEFc-hYWekJ4AaABAg",
      "snippet": {
        "videoId": "_VB39Jo8mAQ",
        "topLevelComment": {
          "kind": "youtube#comment",
          "etag": "ln-ITbuERmba8pGlhFJipqmyXgQ",
          "id": "UgzNOjdmfEFc-hYWekJ4AaABAg",
          "snippet": {
            "videoId": "_VB39Jo8mAQ",

            "textOriginal": "Without money there is incentive to save ressource and no incentive to produce and no knowledge of what is needed to produce. A world without money: good luck with that, historical example have show how dangerous it is!",

            "publishedAt": "2021-09-28T10:15:06Z",
            "updatedAt": "2021-09-28T10:15:06Z"
          }
        },
        "canReply": true,
        "totalReplyCount": 0,
        "isPublic": true
      }
    },
    ...
  ]
}
```
