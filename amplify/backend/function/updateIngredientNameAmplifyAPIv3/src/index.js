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

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    // Params object to retrieve the essential information about restaurant
    const thingName = event.multiValueQueryStringParameters.iotNameThing[0];
    const ingredientName = event.multiValueQueryStringParameters.ingredientName[0];
    try {
        const dynamoInputParams = {
            TableName: "inverte_users_v1",
            Key: { restaurantID: event.pathParameters.restaurantID },
            UpdateExpression: "SET #mapAttribute.#StringAttribute = :newValue",
            ExpressionAttributeNames: {
                "#mapAttribute": "iotThingNames",
                "#StringAttribute": thingName,
            },
            ExpressionAttributeValues: {
                ":newValue": ingredientName,
            },
        }; // This parameters should come from scale
        try {
            const data = await docClient.update(dynamoInputParams).promise();
            console.log("Your data is updated from Dynamo: ", data);
        } catch (error) {
            console.log("Error while updating restaurant meta data from Dynamo: ", error);
        }

        return {
            statusCode: 200,
            // Uncomment below to enable CORS requests
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify(event),
        };
    } catch (err) {
        return { error: err, statusCode: 404 };
    }
};
