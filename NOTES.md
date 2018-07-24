## Notes

You can use a lambda function singleton with reservedConcurrency=1

- 1st request: You can invoke a function.
    ```
    (8a699106-8d59-11e8-905d-b3747276ed60) Sending request to https://lambda.us-east-1.amazonaws.com/2015-03-31/functions/arn:aws:lambda:us-east-1:123456789012:function:lambda-ngrok-dev-hello/invocations
    (8a699106-8d59-11e8-905d-b3747276ed60) Execution failed due to a timeout error
    (8a699106-8d59-11e8-905d-b3747276ed60) Method completed with status: 504
    ```

- 2nd ... requests: You can not invoke the same function
    ```
    (a5e3de30-8d59-11e8-b2f5-9339f1c001b0) Sending request to https://lambda.us-east-1.amazonaws.com/2015-03-31/functions/arn:aws:lambda:us-east-1:123456789012:function:lambda-ngrok-dev-hello/invocations
    (a5e3de30-8d59-11e8-b2f5-9339f1c001b0) Received response. Integration latency: 5 ms
    (a5e3de30-8d59-11e8-b2f5-9339f1c001b0) Endpoint response body before transformations:
    {
        "Reason": "ReservedFunctionConcurrentInvocationLimitExceeded",
        "Type": "User",
        "message": "Rate Exceeded."
    }

    (a5e3de30-8d59-11e8-b2f5-9339f1c001b0) Endpoint response headers: {Connection=keep-alive, x-amzn-RequestId=a5e453c2-8d59-11e8-bf58-f5dde8cf91a3, x-amzn-ErrorType=TooManyRequestsException, Content-Length=104, Date=Sun, 22 Jul 2018 02:48:00 GMT, Content-Type=application/json}
    (a5e3de30-8d59-11e8-b2f5-9339f1c001b0) Execution failed due to configuration error: Malformed Lambda proxy response
    (a5e3de30-8d59-11e8-b2f5-9339f1c001b0) Method completed with status: 502
    ```