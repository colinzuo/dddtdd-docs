
<https://cloud.google.com/dialogflow/es/docs/reference/rest/v2beta1-overview>

## v2beta1.projects

### projects.deleteAgent

`DELETE https://{endpoint}/v2beta1/{parent=projects/*}/agent`

### projects.getAgent

`GET https://{endpoint}/v2beta1/{parent=projects/*}/agent`

```json
{
  "parent": string,
  "displayName": string,
  "defaultLanguageCode": string,
  "supportedLanguageCodes": [
    string
  ],
  "timeZone": string,
  "description": string,
  "avatarUri": string,
  "enableLogging": boolean,
  "matchMode": enum (MatchMode),
  "classificationThreshold": number,
  "apiVersion": enum (ApiVersion),
  "tier": enum (Tier)
}
```

### projects.setAgent

`POST https://{endpoint}/v2beta1/{agent.parent=projects/*}/agent`

#### Query parameters

- updateMask: Optional. The mask to control which fields get updated.

This is a comma-separated list of fully qualified names of fields. Example: "user.displayName,photo".

## v2beta1.projects.agent

- export: `POST /v2beta1/{parent=projects/*}/agent:export`
- import: `POST /v2beta1/{parent=projects/*}/agent:import`

## v2beta1.projects.agent.environments.users.sessions

### projects.agent.environments.users.sessions.deleteContexts

Deletes all active contexts in the specified session.

`DELETE https://{endpoint}/v2beta1/{parent=projects/*/agent/environments/*/users/*/sessions/*}/contexts`

### projects.agent.environments.users.sessions.detectIntent

`POST https://{endpoint}/v2beta1/{session=projects/*/agent/environments/*/users/*/sessions/*}:detectIntent`

```json
{
  "queryParams": {
    object (QueryParameters)
  },
  "queryInput": {
    object (QueryInput)
  },
  "outputAudioConfig": {
    object (OutputAudioConfig)
  },
  "outputAudioConfigMask": string,
  "inputAudio": string
}
```

## v2beta1.projects.agent.intents

### projects.agent.intents.create

`POST https://{endpoint}/v2beta1/{parent=projects/*/agent}/intents`

### projects.agent.intents.delete

`DELETE https://{endpoint}/v2beta1/{name=projects/*/agent/intents/*}`

### projects.agent.intents.patch

`PATCH https://{endpoint}/v2beta1/{intent.name=projects/*/agent/intents/*}`

#### Query parameters

- updateMask: Optional. The mask to control which fields get updated.

### projects.agent.intents.list

`GET https://{endpoint}/v2beta1/{parent=projects/*/agent}/intents`

#### Query parameters

- pageSize
- pageToken

### projects.agent.intents.get

`GET https://{endpoint}/v2beta1/{name=projects/*/agent/intents/*}`

## History

### Sample

`https://dialogflow.clients6.google.com/v2beta1/projects/xxxxxx/locations/global/agent/sessions/-:search?startTime=2021-09-21T16%3A00%3A00.000Z&endTime=2021-09-30T15%3A59%3A59.999Z&platform&pageSize=50&interactionsPageSize=25&intentMatchFilter=ALL_SESSION_CONVERSATIONS&pageToken&searchBackward=false&languageCode&key=AIzaSyD1dO8oRagJkmtkSJ9oLI289jIT8M4Zk5s`

- startTime
- endTime
- pageSize
- interactionsPageSize
- searchBackward

```json
{
    "sessionConversations": [
        {
            "hasNomatchInteraction": true,
            "startTime": "2021-09-29T13:21:24.816Z",
            "endTime": "2021-09-29T13:29:58.366Z",
            "interactions": [
                {
                    "name": "projects/xxxx/locations/global/agent/environments/draft/sessions/35326fd55580fa364028f187c127eb57c2cf491a4cbe3f7579e88ebbacb6bd2a/conversations/1632921684816/interactions/17c31b78b50-e7cb1",
                    "v2Response": {
                        "responseId": "07a653bd-f6cf-4b3f-98a7-c7d69d0bab1d-94f60986",
                        "queryResult": {
                            "queryText": "hello",
                            "parameters": {},
                            "allRequiredParamsPresent": true,
                            "fulfillmentText": "Hello! Welcome to the New York Stock Exchange, home to the greatest companies in the world.",
                            "fulfillmentMessages": [
                                {
                                    "text": {
                                        "text": [
                                            "Hello! Welcome to the New York Stock Exchange, home to the greatest companies in the world."
                                        ]
                                    }
                                },
                                {
                                    "payload": {
                                        "tts": [
                                            {}
                                        ],
                                        "tags": [
                                            "NYSE Logo Screen"
                                        ]
                                    }
                                }
                            ],
                            "intent": {
                                "name": "projects/xxxxx/agent/intents/67437b5e-f3ed-4e87-86cd-9e86918c7610",
                                "displayName": "NYSE Welcome"
                            },
                            "intentDetectionConfidence": 1,
                            "languageCode": "en"
                        },
                        "agentId": "8ed0ce67-e848-4536-ba9e-18156992b328"
                    },
                    "responseTime": "2021-09-29T13:21:24.816Z",
                    "deleteTime": "2022-11-03T13:21:24.816Z",
                    "logType": "DEFAULT",
                    "conversationResponseJson": "{\n  \"queryText\": \"hello\",\n  \"parameters\": {\n  },\n  \"fulfillmentText\": \"Hello! Welcome to the New York Stock Exchange, home to the greatest companies in the world.\",\n  \"fulfillmentMessages\": [{\n    \"text\": {\n      \"text\": [\"Hello! Welcome to the New York Stock Exchange, home to the greatest companies in the world.\"]\n    },\n    \"lang\": \"en\"\n  }, {\n    \"payload\": {\n      \"tags\": [\"NYSE Logo Screen\"],\n      \"tts\": [{\n      }]\n    },\n    \"lang\": \"en\"\n  }],\n  \"intent\": {\n    \"id\": \"67437b5e-f3ed-4e87-86cd-9e86918c7610\",\n    \"displayName\": \"NYSE Welcome\",\n    \"priority\": 500000,\n    \"messages\": [{\n      \"text\": {\n        \"text\": [\"Hello! Welcome to the New York Stock Exchange, home to the greatest companies in the world.\"]\n      },\n      \"lang\": \"en\"\n    }, {\n      \"payload\": {\n        \"tags\": [\"NYSE Logo Screen\"],\n        \"tts\": [{\n        }]\n      },\n      \"lang\": \"en\"\n    }]\n  },\n  \"intentDetectionConfidence\": 1.0,\n  \"languageCode\": \"en\",\n  \"slotfillingMetadata\": {\n    \"allRequiredParamsPresent\": true\n  },\n  \"id\": \"07a653bd-f6cf-4b3f-98a7-c7d69d0bab1d-94f60986\",\n  \"sessionId\": \"858858580010015\",\n  \"timestamp\": \"2021-09-29T13:21:24.814006Z\",\n  \"source\": \"agent\",\n  \"webhookStatus\": {\n    \"webhookEnabledForAgent\": true\n  },\n  \"agentEnvironmentId\": {\n    \"agentId\": \"8ed0ce67-e848-4536-ba9e-18156992b328\",\n    \"cloudProjectId\": \"xxxx\"\n  },\n  \"queriedIntentsCount\": 10\n}"
                }
            ],
            "name": "projects/xxxx/locations/global/agent/environments/draft/sessions/35326fd55580fa364028f187c127eb57c2cf491a4cbe3f7579e88ebbacb6bd2a/conversations/1632921684816"
        }
    ]
}
```