/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require("aws-sdk");

/*!
   @description:Function that process the retrieved data for analytics
   @params:
   @return:Array of all the meta records for time period
   @Comments
   @Coders: Velloupilon
*/
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    let totalInventory,
        totalAccuracy,
        totalTime,
        totalPortion = 0;
    let realTime = [];

    const hourlyData = event.queryStringParameters.hourlyData;
    console.log("The hourlydata before parsing is:", hourlyData); //Debug statement
    let hourlyDataParsed = JSON.parse(hourlyData);
    console.log("The hourly data after parsing is:", hourlyDataParsed); //Debug statement

    //Loop through the hourly metas and compute the summary for that time period
    for (let i = 0; i < hourlyDataParsed.length; i++) {
        console.log("test", hourlyDataParsed[i]);
        totalInventory += hourlyDataParsed[i].hourlySummary.inventoryConsumed;
        totalAccuracy += hourlyDataParsed[i].hourlySummary.accuracy;
        totalTime += hourlyDataParsed[i].hourlySummary.minutesSaved;
        totalPortion += hourlyDataParsed[i].hourlySummary.portionsCompleted;
        realTime.push(JSON.parse(hourlyDataParsed[i].realTime));
    }
    //Calculate the average accuracy
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
