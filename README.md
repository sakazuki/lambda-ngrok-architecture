# lambda-ngrok-architecture

Use lambda with HTTPS without using AWS API Gateway.  
This is a sample application.

## Picture

- TBD

## Benefit

- You can run a stateful application on lambda.
- You can use Basic Authentication.
- You can ignore the auto scale behaviour.

## Dependency

- serverless https://serverless.com/

## How to run

1. git clone this repogitry
1. `npm install`
1. `sls deploy`
1. update Environment Variable on Lambda Mangement Console
1. Execute the lambda function (with Test or else)
1. Access via ngrok URL

