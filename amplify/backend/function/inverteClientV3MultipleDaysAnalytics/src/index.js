/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const fetch = require("node-fetch");
const { Request } = require("node-fetch");
exports.handler = async (event) => {
    console.log("The data from backend i:", event.queryStringParameters);

    // GQL Query
    let body, request;
    let pastData = [];
    let nextToken = null;
    let precision = 0,
        inventoryConsumed = 0,
        timeSaved = 0,
        portionsCompleted = 0,
        underPercent = 0,
        overPercent = 0,
        perfectPercent = 0,
        labels = [],
        precisionArray = [],
        inventoryArray = [],
        timeArray = [],
        portionsArray = [],
        accuracyArray = [];
    const getDays = async () => {
        //GQL variables with filters to query data from DynamoDB
        const variables = {
            filter: {
                createdAt: {
                    between: [event.queryStringParameters.startDate, event.queryStringParameters.endDate],
                },
                year_dayOfYear_iotNameThing_ingredientName: {
                    contains: event.queryStringParameters.iotName,
                },
            },
            nextToken: nextToken,
        };
        const query = listDays;
        console.log("The graphql api key");
        const options = {
            method: "POST",
            headers: {
                "x-api-key": process.env.REACT_APP_GRAPHQL_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        };
        request = new Request(process.env.REACT_APP_GRAPHQL_ENDPOINT, options);
        let statusCode = 200;
        let response;
        try {
            response = await fetch(request);
            console.log("Data we got from dailymeta table is..", response);
            body = await response.json();
            console.log("Body of data we got from dailymeta table is...", body.data);
            pastData.push(...body.data.listDays.items);
            nextToken = body.data.listDays.nextToken;
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
    };
    do {
        await getDays();
    } while (nextToken != null);

    //Processing the data that we got from backend
    for (let i = 0; i < pastData.length; i++) {
        console.log("The day is:", dayOfYearToDayOfWeek(pastData[i].year_dayOfYear_iotNameThing_ingredientName.split("_")[1]));
        portionsCompleted += pastData[i].dailySummary.portionsCompleted;
        precision += pastData[i].dailySummary.precision;
        inventoryConsumed += pastData[i].dailySummary.inventoryConsumed;
        timeSaved += pastData[i].dailySummary.averageTime;
        labels.push(parseInt(pastData[i].year_dayOfYear_iotNameThing_ingredientName.split("_")[1]));
        precisionArray.push(pastData[i].dailySummary.precision);
        inventoryArray.push(pastData[i].dailySummary.inventoryConsumed);
        timeArray.push(pastData[i].dailySummary.averageTime);
        portionsArray.push(pastData[i].dailySummary.portionsCompleted);
        accuracyArray.push(pastData[i].dailySummary.accuracy);
        underPercent += pastData[i].dailySummary.underServed;
        overPercent += pastData[i].dailySummary.overServed;
        perfectPercent += pastData[i].dailySummary.perfect;
    }
    underPercent = Math.round((underPercent / portionsCompleted) * 100);
    overPercent = Math.round((overPercent / portionsCompleted) * 100);
    perfectPercent = Math.round((perfectPercent / portionsCompleted) * 100);
    let totalPercent = underPercent + overPercent + perfectPercent;
    // If the percentage is greater than 100, reduce the underPercent by 1 until it is equal to 100
    if (totalPercent > 100) {
        while (totalPercent > 100) {
            underPercent--;
            totalPercent--;
        }
    }
    const indices = labels.map((value, index) => ({ value, index }));
    // Sort the indices based on the values of the original array
    indices.sort((a, b) => a.value - b.value);
    const sortedValues = indices.map((item) => item.value);
    const sortedIndices = indices.map((item) => item.index);
    // Use the sorted indices to rearrange other arrays
    labels = sortedValues;
    for (let i = 0; i < labels.length; i++) {
        labels[i] = dayOfYearToDayOfWeek(labels[i]);
    }
    precisionArray = sortedIndices.map((index) => precisionArray[index]);
    inventoryArray = sortedIndices.map((index) => inventoryArray[index]);
    timeArray = sortedIndices.map((index) => timeArray[index]);
    portionsArray = sortedIndices.map((index) => portionsArray[index]);
    accuracyArray = sortedIndices.map((index) => accuracyArray[index]);
    // Compute Bar Chart Data
    let barChartData = { precisionArray, inventoryArray, portionsArray, accuracyArray, labels };
    //Average the precision and the time saved for the whole range
    precision = Math.round(precision / pastData.length);
    timeSaved = Math.round(timeSaved / pastData.length);
    let frontEndData = [portionsCompleted, precision, inventoryConsumed, timeSaved, barChartData, underPercent, overPercent, perfectPercent];
    return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(frontEndData),
    };
};

// Function to convert day of the year to day of the week
const dayOfYearToDayOfWeek = (dayOfYear) => {
    // Create a new Date object for the given year and day of the year

    const date = new Date(new Date().getFullYear(), 0); // Assuming the current year

    // Add the number of days to the date
    date.setDate(dayOfYear);

    // Get the day of the week (0 is Sunday, 1 is Monday, ..., 6 is Saturday)
    const dayOfWeekIndex = date.getDay();

    // Array of day names
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Return the corresponding day name
    return dayNames[dayOfWeekIndex];
};
const listDays = /* GraphQL */ `
    query ListDays($year_dayOfYear_iotNameThing_ingredientName: ID, $filter: ModelDayFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listDays(year_dayOfYear_iotNameThing_ingredientName: $year_dayOfYear_iotNameThing_ingredientName, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
            items {
                year_dayOfYear_iotNameThing_ingredientName
                weekOfYear_iotNameThing_ingredientName
                monthOfYear_iotNameThing_ingredientName
                year_iotNameThing_ingredientName
                dashboardGraph
                dailySummary {
                    averageTime
                    portionsCompleted
                    accuracy
                    inventoryConsumed
                    overServed
                    underServed
                    perfect
                    precision
                }
                scaleActions
                allPortionEvents
                createdAt
                updatedAt
                __typename
            }
            nextToken
            __typename
        }
    }
`;
