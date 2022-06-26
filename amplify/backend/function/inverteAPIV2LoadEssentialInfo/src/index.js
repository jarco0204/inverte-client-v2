/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_INVERTECLIENTV2_ARN
	STORAGE_INVERTECLIENTV2_NAME
	STORAGE_INVERTECLIENTV2_STREAMARN
Amplify Params - DO NOT EDIT *//**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const restaurantID = event.pathParameters.restaurantID;
    // This is where you make the call to your Database
    // End of business logic
    const restaurant = { message: "olaKAC", restaurantID: restaurantID };

    return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(restaurant),
    };
};
