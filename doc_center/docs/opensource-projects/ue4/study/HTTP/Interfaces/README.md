
## IHttpBase.h

```c++
/**
 * Base interface for Http Requests and Responses.
 */
class IHttpBase

	/**
	 * Get the URL used to send the request.
	 *
	 * @return the URL string.
	 */
	virtual FString GetURL() const = 0;

	/** 
	 * Gets an URL parameter.
	 * expected format is ?Key=Value&Key=Value...
	 * If that format is not used, this function will not work.
	 * 
	 * @param ParameterName - the parameter to request.
	 * @return the parameter value string.
	 */
	virtual FString GetURLParameter(const FString& ParameterName) const = 0;

	/** 
	 * Gets the value of a header, or empty string if not found. 
	 * 
	 * @param HeaderName - name of the header to set.
	 */
	virtual FString GetHeader(const FString& HeaderName) const = 0;

	/**
	 * Return all headers in an array in "Name: Value" format.
	 *
	 * @return the header array of strings
	 */
	virtual TArray<FString> GetAllHeaders() const = 0;

	/**
	 * Shortcut to get the Content-Type header value (if available)
	 *
	 * @return the content type.
	 */
	virtual FString GetContentType() const = 0;

	/**
	 * Shortcut to get the Content-Length header value. Will not always return non-zero.
	 * If you want the real length of the payload, get the payload and check it's length.
	 *
	 * @return the content length (if available)
	 */
	virtual int32 GetContentLength() const = 0;

	/**
	 * Get the content payload of the request or response.
	 *
	 * @param Content - array that will be filled with the content.
	 */
	virtual const TArray<uint8>& GetContent() const = 0;
```

## IHttpRequest.h

```c++
namespace EHttpRequestStatus
{
	/**
	 * Enumerates the current state of an Http request
	 */
	enum Type
	{
		/** Has not been started via ProcessRequest() */
		NotStarted,
		/** Currently being ticked and processed */
		Processing,
		/** Finished but failed */
		Failed,
		/** Failed because it was unable to connect (safe to retry) */
		Failed_ConnectionError,
		/** Finished and was successful */
		Succeeded
	};

/**
 * Delegate called when an Http request completes
 *
 * @param Request original Http request that started things
 * @param Response response received from the server if a successful connection was established
 * @param bConnectedSuccessfully - indicates whether or not the request was able to connect successfully
 */
DECLARE_DELEGATE_ThreeParams(FHttpRequestCompleteDelegate, FHttpRequestPtr /*Request*/, FHttpResponsePtr /*Response*/, bool /*bConnectedSuccessfully*/);

/**
 * Delegate called when an Http request will be retried in the future
 *
 * @param Request - original Http request that started things
 * @param Response - response received from the server if a successful connection was established
 * @param SecondsToRetry - seconds in the future when the response will be retried
 */
DECLARE_DELEGATE_ThreeParams(FHttpRequestWillRetryDelegate, FHttpRequestPtr /*Request*/, FHttpResponsePtr /*Response*/, float /*SecondsToRetry*/);

/**
 * Interface for Http requests (created using FHttpFactory)
 */
class IHttpRequest : 
	public IHttpBase, public TSharedFromThis<IHttpRequest, ESPMode::ThreadSafe>

	/**
	 * Gets the verb (GET, PUT, POST) used by the request.
	 * 
	 * @return the verb string
	 */
	virtual FString GetVerb() const = 0;

	/**
	 * Sets the verb used by the request.
	 * Eg. (GET, PUT, POST)
	 * Should be set before calling ProcessRequest.
	 * If not specified then a GET is assumed.
	 *
	 * @param Verb - verb to use.
	 */
	virtual void SetVerb(const FString& Verb) = 0;

	/**
	 * Sets the URL for the request 
	 * Eg. (http://my.domain.com/something.ext?key=value&key2=value).
	 * Must be set before calling ProcessRequest.
	 *
	 * @param URL - URL to use.
	 */
	virtual void SetURL(const FString& URL) = 0;

	/**
	 * Sets the content of the request (optional data).
	 * Usually only set for POST requests.
	 *
	 * @param ContentPayload - payload to set.
	 */
	virtual void SetContent(const TArray<uint8>& ContentPayload) = 0;

	/**
	 * Sets the content of the request (optional data).
	 * Usually only set for POST requests.
	 *
	 * This version lets the API take ownership of the payload directly, helpful for larger payloads.
	 *
	 * @param ContentPayload - payload to set.
	 */
	virtual void SetContent(TArray<uint8>&& ContentPayload) = 0;

	/**
	 * Sets the content of the request as a string encoded as UTF8.
	 *
	 * @param ContentString - payload to set.
	 */
	virtual void SetContentAsString(const FString& ContentString) = 0;
    
    /**
     * Sets the content of the request to stream from a file.
     *
     * @param FileName - filename from which to stream the body.
	 * @return True if the file is valid and will be used to stream the request. False otherwise.
     */
    virtual bool SetContentAsStreamedFile(const FString& Filename) = 0;

	/**
	 * Sets the content of the request to stream directly from an archive.
	 *
	 * @param Stream - archive from which the payload should be streamed.
	 * @return True if the archive can be used to stream the request. False otherwise.
	 */
	virtual bool SetContentFromStream(TSharedRef<FArchive, ESPMode::ThreadSafe> Stream) = 0;

	/**
	 * Sets optional header info.
	 * SetHeader for a given HeaderName will overwrite any previous values
	 * Use AppendToHeader to append more values for the same header
	 * Content-Length is the only header set for you.
	 * Required headers depends on the request itself.
	 * Eg. "multipart/form-data" needed for a form post
	 *
	 * @param HeaderName - Name of the header (ie, Content-Type)
	 * @param HeaderValue - Value of the header
	 */
	virtual void SetHeader(const FString& HeaderName, const FString& HeaderValue) = 0;

	/**
	* Appends to the value already set in the header. 
	* If there is already content in that header, a comma delimiter is used.
	* If the header is as of yet unset, the result is the same as calling SetHeader
	* Content-Length is the only header set for you.
	* Also see: SetHeader()
	*
	* @param HeaderName - Name of the header (ie, Content-Type)
	* @param AdditionalHeaderValue - Value to add to the existing contents of the specified header.
	*	comma is inserted between old value and new value, per HTTP specifications
	*/
	virtual void AppendToHeader(const FString& HeaderName, const FString& AdditionalHeaderValue) = 0;

	/**
	 * Sets an optional timeout in seconds for this entire HTTP request to complete.
	 * If set, this value overrides the default HTTP timeout set via FHttpModule::SetTimeout().
	 *
	 * @param InTimeoutSecs - Timeout for this HTTP request instance, in seconds
	 */
	virtual void SetTimeout(float InTimeoutSecs) = 0;

	/**
	 * Clears the optional timeout in seconds for this HTTP request, causing the default value
	 * from FHttpModule::GetTimeout() to be used.
	 */
	virtual void ClearTimeout() = 0;

	/**
	 * Gets the optional timeout in seconds for this entire HTTP request to complete.
	 * If valid, this value overrides the default HTTP timeout set via FHttpModule::SetTimeout().
	 *
	 * @return the timeout for this HTTP request instance, in seconds
	 */
	virtual TOptional<float> GetTimeout() const = 0;

	/**
	 * Called to begin processing the request.
	 * OnProcessRequestComplete delegate is always called when the request completes or on error if it is bound.
	 * A request can be re-used but not while still being processed.
	 *
	 * @return if the request was successfully started.
	 */
	virtual bool ProcessRequest() = 0;

	/**
	 * Delegate called when the request is complete. See FHttpRequestCompleteDelegate
	 */
	virtual FHttpRequestCompleteDelegate& OnProcessRequestComplete() = 0;

	/**
	 * Delegate called to update the request/response progress. See FHttpRequestProgressDelegate
	 */
	virtual FHttpRequestProgressDelegate& OnRequestProgress() = 0;
	
	/**
	* Delegate called when the request will be retried
	*/
	virtual FHttpRequestWillRetryDelegate& OnRequestWillRetry() = 0;

	/**
	 * Called to cancel a request that is still being processed
	 */
	virtual void CancelRequest() = 0;

	/**
	 * Get the current status of the request being processed
	 *
	 * @return the current status
	 */
	virtual EHttpRequestStatus::Type GetStatus() const = 0;

	/**
	 * Get the associated Response
	 *
	 * @return the response
	 */
	virtual const FHttpResponsePtr GetResponse() const = 0;      
```

## IHttpResponse.h

```c++
namespace EHttpResponseCodes
{
	/**
	 * Response codes that can come back from an Http request
	 */
	enum Type
	{
		// status code not set yet
		Unknown = 0,
		// the request can be continued.
		Continue = 100,
		// the server has switched protocols in an upgrade header.
		SwitchProtocol = 101,
		// the request completed successfully.
		Ok = 200,
		// the request has been fulfilled and resulted in the creation of a new resource.
		Created = 201,
		// the request has been accepted for processing, but the processing has not been completed.
		Accepted = 202,
		// the returned meta information in the entity-header is not the definitive set available from the origin server.
		Partial = 203,
		// the server has fulfilled the request, but there is no new information to send back.
		NoContent = 204,

/**
 * Inteface for Http responses that come back after starting an Http request
 */
class IHttpResponse : public IHttpBase

	/**
	 * Gets the response code returned by the requested server.
	 * See EHttpResponseCodes for known response codes
	 *
	 * @return the response code.
	 */
	virtual int32 GetResponseCode() const = 0;

	/**
	 * Returns the payload as a string, assuming the payload is UTF8.
	 *
	 * @return the payload as a string.
	 */
	virtual FString GetContentAsString() const = 0;
```
