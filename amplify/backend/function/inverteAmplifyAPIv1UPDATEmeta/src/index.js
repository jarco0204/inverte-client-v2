/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require("aws-sdk");

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    let iotThingName = event.pathParameters.iotNameThing;
    let curTimeStamp = event.queryStringParameters;
    let tempPayload = {
        iotThingName: iotThingName,
        curTimeStamp: curTimeStamp,
    };

    // console.log("Your IoT Thing Name is: ", iotThingName);
    // console.log("Your TS is: ", curTimeStamp);

    // Call your serverless lambda
    // Create an instance of the AWS Lambda class
    const lambda = new AWS.Lambda();

    // Define the parameters for the Lambda function
    const params = {
        FunctionName: "inverte-serverless-v1-dev11-createHourlyMetaRecord",
        Payload: JSON.stringify(tempPayload),
    };

    // Call the Lambda function using the 'invoke' method
    try {
        console.log("Calling lambda from lambda...");
        const result = await lambda.invoke(params).promise();
        console.log("Success: ", result);
        return {
            statusCode: 200,
            //  Uncomment below to enable CORS requests
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify("Successfully called Lambda and created Hourly Meta Record with Serverless"),
        };
    } catch (error) {
        console.log("Error: ", error);
        return {
            statusCode: 404,
            //  Uncomment below to enable CORS requests
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify("Failed to call UPDATE Lambda and thus failed to create Hourly Meta Record with Serverless."),
        };
    }
};
