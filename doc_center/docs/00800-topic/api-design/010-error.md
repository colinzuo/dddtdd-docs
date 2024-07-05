
## google

[https://cloud.google.com/apis/design/errors](https://cloud.google.com/apis/design/errors)

Because most Google APIs use resource-oriented API design, the error handling follows the same design principle by using a **small set of standard errors** with a large number of resources.

When using gRPC, **errors are included in the headers**, and total headers in responses are limited to 8 KB (8,192 bytes). Ensure that errors do not exceed 1-2 KB in size

### Error Codes

Google APIs must use the canonical error codes defined by `google.rpc.Code`. Individual APIs **must avoid defining additional error codes**, since developers are very unlikely to write logic to handle a large number of error codes.

### Propagating Errors

If your API service depends on other services, you **should not blindly propagate errors** from those services to your clients. When translating errors, we suggest the following:

- Hide implementation details and confidential information.
- Adjust the party responsible for the error. For example, a server that receives an `INVALID_ARGUMENT` error from another service should propagate an `INTERNAL` to its own caller.

### Generating Errors

If you are a server developer, you **should generate errors with enough information** to help client developers understand and resolve the problem.

**对5xx系列问题**

Note: Since the client cannot fix the server error, it is not useful to generate additional error details. To avoid leaking sensitive information under error conditions, it is recommended not to generate any error message and only generate google.rpc.DebugInfo error details. The DebugInfo is specially designed only for server-side logging, and must not be sent to client.


