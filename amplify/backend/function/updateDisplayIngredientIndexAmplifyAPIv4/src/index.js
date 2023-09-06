/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	REACT_APP_GRAPHQL_API_KEY
	REACT_APP_GRAPHQL_ENDPOINT
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        const dynamoInputParams = {
            TableName: "inverte_users_v1",
            Key: { restaurantID: event.pathParameters.restaurantID },
            UpdateExpression: "set #integerAttribute = :newValue",
            ExpressionAttributeNames: {
                "#integerAttribute": "displayIngredient",
            },
            ExpressionAttributeValues: {
                ":newValue": event.multiValueQueryStringParameters.index[0],
            },
        };
        try {
            const data = await docClient.update(dynamoInputParams).promise();
            console.log("Your data is updated from Dynamoo: ", data);
        } catch (error) {
            console.log("Error while updating restaurant meta data from Dynamo: ", error);
        }

        return {
            statusCode: 200,
            //  Uncomment below to enable CORS requests
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify("Hello from Lambda!"),
        };
    } catch (error) {
        return { error: error, statusCode: 404 };
    }
};
