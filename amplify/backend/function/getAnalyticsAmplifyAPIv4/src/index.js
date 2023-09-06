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
const fetch = require("node-fetch");
const { Request } = require("node-fetch");
const listHours = /* GraphQL */ `
    query ListHours($dayOfYear_hourOfDay_iotNameThing: ID, $filter: ModelHourFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listHours(dayOfYear_hourOfDay_iotNameThing: $dayOfYear_hourOfDay_iotNameThing, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
            items {
                dayOfYear_hourOfDay_iotNameThing
                dayOfYear_iotNameThing
                minuteOfHour_secondOfMinute
                hourlySummary {
                    minutesSaved
                    portionsCompleted
                    accuracy
                    inventoryConsumed
                    __typename
                }
                realTime
                scaleActions
                createdAt
                portionEvent {
                    nextToken
                    __typename
                }
                updatedAt
                dayHourDayOfYear_iotNameThing
                __typename
            }
            nextToken
            __typename
        }
    }
`;
/*!
   @description:Function that process the retrieved data for analytics
   @params:
   @return:Array of all the meta records for time period
   @Comments
   @Coders: Vellou
*/
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    console.log("Testing env variables:", process.env.REACT_APP_GRAPHQL_ENDPOINT);

    let totalInventory = 0,
        totalAccuracy = 0,
        totalTime = 0,
        totalPortion = 0;
    let realTime = [];

    const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT;
    const GRAPHQL_API_KEY = process.env.REACT_APP_GRAPHQL_API_KEY;

    let startDate = JSON.parse(event.queryStringParameters.startDate);
    let endDate = JSON.parse(event.queryStringParameters.endDate);
    let hourlyDataParsed;
    const query = listHours;
    let options = {
        method: "POST",
        headers: {
            "x-api-key": GRAPHQL_API_KEY,
            "content-type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables: {
                filter: {
                    createdAt: {
                        between: [startDate, endDate],
                    },
                    dayOfYear_hourOfDay_iotNameThing: { contains: event.queryStringParameters.scale },
                },
            },
        }),
    };
    const request = new Request(GRAPHQL_ENDPOINT, options);
    let statusCode = 200;
    let body;
    let response;
    try {
        response = await fetch(request);
        console.log("Updated Data we got from dailymeta table is...", response);
        body = await response.json();
        console.log("Body of data we got from dailymeta table is...", body.data.listHours.items);
        hourlyDataParsed = body.data.listHours.items;
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

    //Loop through the hourly metas and compute the summary for that time period
    for (let i = 0; i < hourlyDataParsed.length; i++) {
        console.log("test", hourlyDataParsed[i]);
        totalInventory = totalInventory + hourlyDataParsed[i].hourlySummary.inventoryConsumed;
        totalAccuracy += hourlyDataParsed[i].hourlySummary.accuracy;
        totalTime += hourlyDataParsed[i].hourlySummary.minutesSaved;
        totalPortion += hourlyDataParsed[i].hourlySummary.portionsCompleted;
        realTime.push(JSON.parse(hourlyDataParsed[i].realTime));
    }
    //Calculate the average accuracy
    console.log("The total accuracy is", totalAccuracy);
    totalAccuracy /= hourlyDataParsed.length;
    console.log("The total realTime data is:", realTime); //Debug statement

    //Merge the real time data for the realtime data and sort them in ascending order
    const mergedObj = realTime.reduce((result, obj) => {
        return { ...result, ...obj };
    }, {});
    console.log("The merged object is:", mergedObj);

    //Process Real Time Data
    const weightChartData = Object.keys(mergedObj)
        .map((item) => ({
            x: item,
            y: mergedObj[item].portionWeight,
        }))
        .sort((a, b) => a.x.localeCompare(b.x));
    const accuracyChartData = Object.keys(mergedObj)
        .map((item) => ({
            x: item,
            y: mergedObj[item].accuracy,
        }))
        .sort((a, b) => a.x.localeCompare(b.x));
    const portionTimeChartData = Object.keys(mergedObj)
        .map((item) => ({
            x: item,
            y: mergedObj[item].portionTime,
        }))
        .sort((a, b) => a.x.localeCompare(b.x));

    // console.log("The chart data is: ", weightChartData);
    //Return the data
    const portionEvents = {
        message: "Information correctly retrieved from Dynamo using Lambda420",
        sdkVersion: AWS.VERSION,
        portionEvents: [totalInventory, totalAccuracy, totalTime, totalPortion, weightChartData, accuracyChartData, portionTimeChartData],
    };

    return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(portionEvents),
    };
};
