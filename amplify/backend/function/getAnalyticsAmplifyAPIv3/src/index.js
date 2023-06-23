/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

//Function to get the item from the database
async function getItem(params) {
    try {
        const data = await docClient.get(params).promise();
        return data;
    } catch (err) {
        return err;
    }
}
//Function to compute the key for the day of the year and hour of the day
const computeKey = (date, iotName) => {
    const options = { timeZone: "America/St_Johns" };
    const formattedDateObject = date.toLocaleString("en-US", options);
    const formattedDate = new Date(formattedDateObject);
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const numberOfDays = Math.floor((formattedDate.getTime() - startOfYear.getTime()) / millisecondsInDay);
    const hour = formattedDate.getHours();
    let key = numberOfDays + "_" + hour + "_" + iotName;
    return key;
};

/*!
   @description:Function that retrieves data for time period in Database
   @params:
   @return:Array of all the meta records for time period
   @Comments
   @Coders: Velloupilon
*/
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    //Compute key for the day of the year and hour of the day
    const options = { timeZone: "America/St_Johns" };
    const date = new Date(event.queryStringParameters.date);
    const formattedStartDateObject = date.toLocaleString("en-US", options);
    const formattedStartDate = new Date(formattedStartDateObject);
    const endDate = new Date(event.queryStringParameters.endDate);
    const formattedEndDateObject = endDate.toLocaleString("en-US", options);
    const formattedEndDate = new Date(formattedEndDateObject);
    let totalInventory = 0;
    let totalAccuracy = 0;
    let totalTime = 0;
    let totalPortion = 0;
    let realTime = [];
    console.log("The start date is:", event.queryStringParameters.date);
    console.log("The end date is:", event.queryStringParameters.date);

    //Compute the keys for the time period
    let keys = [];
    while (formattedStartDate.getHours() != formattedEndDate.getHours()) {
        console.log("The start hour is:", formattedStartDate.getHours());
        console.log("The end hour is:", formattedEndDate.getHours());
        keys.push(computeKey(date, event.queryStringParameters.iotName));
        formattedStartDate.setHours(formattedStartDate.getHours() + 1);
        date.setHours(date.getHours() + 1);
    }
    console.log("The key is:", keys);

    //Loop through the keys and call the database
    const data = [];
    for (let i = 0; i < keys.length; i++) {
        const params = {
            TableName: "inverte_metaRecords_dev11",
            Key: { dayOfYear_hourOfDay_iotNameThing: keys[i], minuteOfHour_secondOfMinute: "60_60" }, // This parameters should come from scale
        };

        // Call to your Database
        try {
            data.push(await getItem(params));
            console.log("The data is:", data);
        } catch (err) {
            return { error: err, statusCode: 404 };
        }
    }
    console.log("The data fetched is", data); //Debug statement
    //Process the data to be displayed in Analytics
    let nonEmptyObjects = 0;
    for (let i = 0; i < data.length; i++) {
        if (Object.keys(data[i]).length != 0) {
            totalInventory += data[i].Item.hourlySummary.inventoryConsumed;
            totalAccuracy += data[i].Item.hourlySummary.accuracy;
            totalTime += data[i].Item.hourlySummary.minutesSaved;
            totalPortion += data[i].Item.hourlySummary.portionsCompleted;
            realTime.concat(data[i].Item.hourlySummary.realTime);
            nonEmptyObjects++;
        }
    }
    totalAccuracy /= nonEmptyObjects;

    //Return the data
    const portionEvents = {
        message: "Information correctly retrieved from Dynamo using Lambda420",
        sdkVersion: AWS.VERSION,
        portionEvents: [totalInventory, totalAccuracy, totalTime, totalPortion, realTime],
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
