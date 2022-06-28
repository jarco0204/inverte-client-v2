/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_INVERTECLIENTV2USERS_ARN
	STORAGE_INVERTECLIENTV2USERS_NAME
	STORAGE_INVERTECLIENTV2USERS_STREAMARN
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

async function getItem(params) {
    try {
        const data = await docClient.get(params).promise();
        return data;
    } catch (err) {
        return err;
    }
}

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const restaurantID = event.pathParameters.restaurantID;

    // Params object to retrieve the essential information about restaurant
    const params = {
        TableName: "inverteClientV2Users-staging",
        Key: { restaurantID: restaurantID },
    };

    // Call to your Database
    try {
        const data = await getItem(params);
        const restaurant = {
            message:
                "Information correctly retrieved from Dynamo using Lambda + API Gateway",
            sdkVersion: AWS.VERSION,
            scaleData: data,
        };
        return {
            statusCode: 200,
            //  Uncomment below to enable CORS requests
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify(restaurant),
        };
    } catch (err) {
        return { error: err, statusCode: 404 };
    }
};
