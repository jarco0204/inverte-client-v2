/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
/*!
   @description:Handler function that updates the ingredient name whenever it is changed by client
   @params:
   @return:event
   @Comments
   @Coders:Rohan
*/
const getRestaurant = /* GraphQL */ `
    query GetRestaurant($restaurant_id: ID!) {
        getRestaurant(restaurant_id: $restaurant_id) {
            restaurant_id
            demo
            iotThingNames
            restaurantLocationNum
            displayIngredient
            restaurantName
            unitOfMass
            timeZone
            scale {
                items {
                    iotNameThing
                    restaurant_id
                    unitOfMass
                    multiplier
                    firmwareVersion
                    createdAt
                    updatedAt
                    restaurantScaleRestaurant_id
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            __typename
        }
    }
`;
const updateRestaurant = /* GraphQL */ `
    mutation UpdateRestaurant($input: UpdateRestaurantInput!, $condition: ModelRestaurantConditionInput) {
        updateRestaurant(input: $input, condition: $condition) {
            restaurant_id
            demo
            iotThingNames
            restaurantLocationNum
            displayIngredient
            restaurantName
            unitOfMass
            timeZone
            scale {
                items {
                    iotNameThing
                    restaurant_id
                    unitOfMass
                    multiplier
                    firmwareVersion
                    createdAt
                    updatedAt
                    restaurantScaleRestaurant_id
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            __typename
        }
    }
`;
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    // Params object to retrieve the essential information about restaurant
    const restaurantID = event.pathParameters.restaurantID;
    const thingName = event.multiValueQueryStringParameters.iotNameThing[0];
    const ingredientName = event.multiValueQueryStringParameters.ingredientName[0];
    const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT;
    const GRAPHQL_API_KEY = process.env.REACT_APP_GRAPHQL_API_KEY;

    try {
        const query = getRestaurant;
        let options = {
            method: "POST",
            headers: {
                "x-api-key": GRAPHQL_API_KEY,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                query,
                variables: { restaurant_id: restaurantID },
            }),
        };
        let request = new Request(GRAPHQL_ENDPOINT, options);
        let statusCode = 200;
        let body;
        let response;
        try {
            response = await fetch(request);
            body = await response.json();
            console.log("Body of data we got from Restaurant table is...", body.data.getRestaurant);
            if (body.errors) statusCode = 400;
        } catch (error) {
            statusCode = 400;
            body = {
                errors: [
                    {
                        status: response.status,
                        message: error.message,
                        stack: error.stack,
                    },
                ],
            };
        }
        let iotThingNames = body.data.getRestaurant.iotThingNames;
        iotThingNames = JSON.parse(iotThingNames);
        iotThingNames[thingName] = ingredientName;
        return {
            statusCode: 200,
            // Uncomment below to enable CORS requests
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify(iotThingNames),
        };
    } catch (err) {
        return { error: err, statusCode: 404 };
    }
};
