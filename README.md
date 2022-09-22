# InVerte Client App V2

Copyright ©2022, InVerte FoodTech Inc. - All rights reserved.

### Summary

This is the second version of the client app that is used in production for Q2 2022.
It is writtent in Javascript, which leads to cleaner & lighter architecture to permit scalability.

#### Coders

Christian & Johan

### How to Run?

1. yarn install \
2. yarn start \
3. Add .env.local file to root of project \

## Front-End

## Conventions

• CSS filenames should be named after the container to which the style is being applied.

#### Libraries

• React. \
• Material UI. \

## Back-End

This app has a backend with AWS Amplify. The appId is dw3m3x2i8gouy and it's under the name of inverteClientV2

#### Libraries

• AWS-Amplify
• Lambda

#### Cognito Authentication

Resource name is 'inverteclientv2377057d3' and serviceName is 'auth' \

• In AWS, the name of the Cognito user pool & Federated Identity is 'inverteclientv2377057d3_identitypool_377057d3\_\_dev'

#### REST API

The endpoint of our API is: \

https://ywm4hy967c.execute-api.ca-central-1.amazonaws.com/staging \

It supports these routes: \
• restaurant/{restaurantID} \

#### Storage

• This app currently uses a NoSQL database (DynamoDB) where it fetches the essential information. \
• The name of the app is inverteClientV2 \
• The Columns are: restaurantID, restaurantCode

### How to continue working on backend

• Install Amplify CLI (App tested with V8.5.1) \
• Run this command from root: "amplify pull --appId dann226afna7j --envName staging" \
• Run amplify update "serviceName" \

### Special Notes

• Husky had to be turned off as of branch of #046f8b4
• The main content container entry is nested in Navbar component. Latest Changes (mobileSupport branch) that modify the positioning of the content container were done inside Navbar.js
