/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_INVERTECLIENTV2_ARN
	STORAGE_INVERTECLIENTV2_NAME
	STORAGE_INVERTECLIENTV2_STREAMARN
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
    ENV
    REGION
    STORAGE_INVERTECLIENTV2_ARN
    STORAGE_INVERTECLIENTV2_NAME
    STORAGE_INVERTECLIENTV2_STREAMARN
Amplify Params - DO NOT EDIT */ /**
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
    // console.log(`EVENT: ${JSON.stringify(event)}`);
    const restaurantID = event.pathParameters.restaurantID;
    // This is where you make the call to your Database
    const params = {
        TableName: "inverteClientV2",
        Key: {
            restaurantID: restaurantID,
        },
    };
    try {
        const data = await getItem(params);
        const restaurant = {
            message: "olaKAC",
            restaurantID: restaurantID,
            version: AWS.VERSION,
            data: data,
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
