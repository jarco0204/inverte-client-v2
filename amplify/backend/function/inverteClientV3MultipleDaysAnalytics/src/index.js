/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const fetch = require("node-fetch");
const { Request } = require("node-fetch");
exports.handler = async (event) => {
    console.log("The data from backend is:", event.queryStringParameters);
    const variables = {
        filter: {
            createdAt: {
                between: [event.queryStringParameters.startDate, event.queryStringParameters.endDate],
            },
            dayOfYear_iotNameThing: {
                contains: event.queryStringParameters.iotName,
            },
        },
    };

    // GQL Query
    let body, request, pastData;
    let precision = 0,
        inventoryConsumed = 0,
        timeSaved = 0,
        portionsCompleted = 0,
        underPercent = 0,
        overPercent = 0,
        perfectPercent = 0;
    const query = listDays;
    const options = {
        method: "POST",
        headers: {
            "x-api-key": "da2-sohavfnf3rcgnmxvkkwchal7w4",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    };
    request = new Request("https://nmvtwlrgs5hghnpiro5zsslp3e.appsync-api.ca-central-1.amazonaws.com/graphql", options);
    let statusCode = 200;
    let response;
    try {
        response = await fetch(request);
        console.log("Data we got from dailymeta table is...", response);
        body = await response.json();
        console.log("Body of data we got from dailymeta table is...", body.data.listDays.items);
        pastData = body.data.listDays.items;
        if (body.errors) statusCode = 400;
    } catch (error) {
        statusCode = 400;
        body = {
            errors: [
                {
                    status: response,
                    message: error,
                    stack: error,
                },
            ],
        };
        console.log("Error is", error);
    }
    for (let i = 0; i < pastData.length; i++) {
        console.log("The data is", pastData[i].dailySummary);
        portionsCompleted += pastData[i].dailySummary.portionsCompleted;
        precision += pastData[i].dailySummary.precision;
        inventoryConsumed += pastData[i].dailySummary.inventoryConsumed;
        timeSaved += pastData[i].dailySummary.averageTime;
    }
    portionsCompleted = Math.round(portionsCompleted / pastData.length);
    precision = Math.round(precision / pastData.length);
    inventoryConsumed = Math.round(inventoryConsumed / pastData.length);
    timeSaved = Math.round(timeSaved / pastData.length);
    let cardData = [portionsCompleted, precision, inventoryConsumed, timeSaved];
    return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(cardData),
    };
};
const listDays = /* GraphQL */ `
    query ListDays($dayOfYear_iotNameThing: ID, $filter: ModelDayFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listDays(dayOfYear_iotNameThing: $dayOfYear_iotNameThing, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
            items {
                dailySummary {
                    averageTime
                    portionsCompleted
                    accuracy
                    inventoryConsumed
                    overServed
                    underServed
                    perfect
                    precision
                    __typename
                }
                allPortionEvents
                updatedAt
                __typename
            }
            nextToken
            __typename
        }
    }
`;
