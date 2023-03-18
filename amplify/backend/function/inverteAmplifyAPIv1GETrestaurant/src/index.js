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
    // Params object to retrieve the essential information about restaurant
    const params = {
        TableName: "inverte_users_v1",
        Key: { restaurantID: 74 }, // This parameters should come from scale
    };
    return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
        // body: JSON.stringify(restaurant),
    };

    // Call to your Database
    // try {
    //     // const data = await getItem(params);
    //     // const restaurant = {
    //     //     message: "Information correctly retrieved from Dynamo using Lambda420",
    //     //     sdkVersion: AWS.VERSION,
    //     //     daily: data.Item,
    //     // };
    //     return {
    //         statusCode: 200,
    //         //  Uncomment below to enable CORS requests
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Headers": "*",
    //         },
    //         // body: JSON.stringify(restaurant),
    //     };
    // } catch (err) {
    //     return { error: err, statusCode: 404 };
    // }
};
