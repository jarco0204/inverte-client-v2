//Custom query to get only the necessary data from table so that we don't pull the big realTime object each time
export const getDashboard = /* GraphQL */ `
    query GetDay($dayOfYear_iotNameThing: ID!) {
        getDay(dayOfYear_iotNameThing: $dayOfYear_iotNameThing) {
            dayOfYear_iotNameThing

            dailySummary {
                averageTime
                portionsCompleted
                accuracy
                inventoryConsumed
                overServed
                underServed
                perfect
                precision
                day {
                    dayOfYear_iotNameThing
                    weekOfYear_iotNameThing
                    realTime
                    dashboardGraph
                    scaleActions
                    createdAt
                    updatedAt
                    weekDayWeekOfYear_iotNameThing
                    __typename
                }
                __typename
            }
            hour {
                items {
                    dayOfYear_hourOfDay_iotNameThing
                    dayOfYear_iotNameThing
                    realTime
                    scaleActions
                    createdAt
                    updatedAt
                    dayHourDayOfYear_iotNameThing
                    hourlySummary {
                        averageTime
                        portionsCompleted
                        accuracy
                        inventoryConsumed
                        overServed
                        underServed
                        perfect
                        precision
                    }
                    __typename
                }
                nextToken
                __typename
            }
            dashboardGraph
        }
    }
`;
