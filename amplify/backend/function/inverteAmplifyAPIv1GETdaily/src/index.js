/* Amplify Params - DO NOT EDIT
	ENV
	REGION
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

    // console.log(event.queryStringParameters);

    // Params object to retrieve the essential information about restaurant
    let key = event.queryStringParameters.dayOfYear + "_" + event.queryStringParameters.hourOfDay + "_" + event.pathParameters.scaleID;
    const params = {
        TableName: "inverte_portionEvents_v5",
        Key: { dayOfYear_hourOfDay_deviceID: key, minuteOfHour_secondOfMinute: "60_60" }, // This parameters should come from scale
    };

    // Call to your Database
    try {
        const data = await getItem(params);
        const restaurant = {
            message: "Information correctly retrieved from Dynamo using Lambda420",
            sdkVersion: AWS.VERSION,
            daily: data.Item,
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
