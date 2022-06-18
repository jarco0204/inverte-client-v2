## InVerte Client App V2

Copyright ©2022, InVerte FoodTech Inc. - All rights reserved.

### Summary

This is the second version of the client app that is used in production for Q2 2022.
It is writtent in Javascript, which leads to cleaner & lighter architecture to permit scalability.

#### Coders

Christian & Johan

#### Libraries

• React. \
• Material UI. \

### How to Run?

1. yarn install \
2. yarn start

### Back-End

This app has a backend with AWS Amplify. The appId is dw3m3x2i8gouy and it's under the name of inverteClientV2

#### Cognito Authentication

Resource name is 'inverteclientv2377057d3' and serviceName is 'auth' \

• In AWS, the name of the Cognito user pool & Federated Identity is 'inverteclientv2377057d3_identitypool_377057d3\_\_dev'

#### How to continue working on backend

• Install Amplify CLI (App tested with V8.5.1) \
• Run this command from root: "amplify pull --appId d33722c7tgxo6u --envName staging" \
• Run amplify update "serviceName" \

### Special Notes

• Husky had to be turned off as of branch of #046f8b4
