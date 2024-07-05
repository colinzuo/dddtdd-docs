
## schema

```json
2021-09-13 10:00:21.383 ERROR 3288 --- [     parallel-3] c.c.h.a.c.aop.WebFluxLogAspectBase        : json_extract_prefix {
  "timestamp" : "2021-09-13T10:00:21.3801545+08:00",
  "rootReqId" : "613eb0b4f2201b73",
  "reqId" : "613eb0b4f2201b73",
  "type" : "WEB_FLUX_DEMO_DEL_DEVICE",
  "tags" : [ "WEB_FLUX_DEMO_REST" ],
  "error" : {
    "code" : 1004,
    "message" : "RES_TIMEOUT"
  },
  "costTimeMs" : 1104,
  "stdData" : {
    "req" : {
      "recvTimestamp" : "2021-09-13T10:00:20.2760709+08:00",
      "reqSrc" : "RestController",
      "userIp" : "/127.0.0.1:1293",
      "uri" : "/mvc-demo/devices.del.timeout/2021",
      "queryString" : "tenantId=666"
    }
  },
  "webFluxDemoData" : {
    "rsp" : {
      "reqId" : "613eb0b4f2201b73",
      "error" : {
        "code" : 1004,
        "message" : "RES_TIMEOUT"
      },
      "costTimeMs" : 1104
    }
  }
}
```

## java

通过aop实现

```java
	@ElkRecordable(type = WebFluxDemoElkRecordConsts.Type.WEB_FLUX_DEMO_CREATE_DEVICE,
			tags = WebFluxDemoElkRecordConsts.Tag.WEB_FLUX_DEMO_REST)
	@PostMapping(value = "/devices")
	public BaseResponse createDevice(EventContext eventContext,
			@RequestBody CreateDeviceReq createDeviceReq) {
```

## python

tbd
