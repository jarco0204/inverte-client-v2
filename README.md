# InVerte Client App V2

Copyright ©2023, InVerte FoodTech Inc. - All rights reserved.

#### Summary

This is the second version of the client app that is used in production for Q2 2023.

#### Conventions

• CSS filenames should be named after the container to which the style is being applied.

• Console log statements should have '// Debug Statement' next to it

• All Methods should follow the method signature defined in Tech (Notion)

#### Libraries

• React
• Material UI
• AWS-Amplify
• TODO: Add other librarie

## How to Run Front-End?

1. yarn install
2. yarn start

## How to Run Back-End?

#### Amplify CLI version 11.0.2

This app has a backend with AWS Amplify. It's name is staging:

• amplify pull --appId dlz2p74nl9u8 --envName staging

#### Cognito Authentication

Resource name is inverteclientv228c7d778_userpool_28c7d778-staging

#### REST API in Device Gateway

The name of our API is: inverteClientAmplifyAPIv1 \

It supports these routes: \
• restaurant/{restaurantID} : Pulls essential restaurant meta data
• daily/{scaleID} : Pulls the daily real-time data associated with scale

#### Storage

• This app currently uses a NoSQL database (DynamoDB) where it fetches the essential information.
• The name of the app is inverteClientV2 \
• The Columns are: restaurantID, restaurantCode

### Special Notes

• Husky had to be turned off as of branch of #046f8b4
• The main content container entry is nested in Navbar component. Latest Changes (mobileSupport branch) that modify the positioning of the content container were done inside Navbar.js
• Amplify API access is not restricted
• Used https://medium.com/how-to-react/config-eslint-and-prettier-in-visual-studio-code-for-react-js-development-97bb2236b31a to set up ESLint
//Eslint-disable next-line
https://stackoverflow.com/questions/67992894/component-definition-is-missing-display-name-for-forwardref

https://www.creative-tim.com/learning-lab/react/quick-start/material-dashboard/

#### Special Notes

• If you update your local environment variables file, you have to also update them in Amplify.
