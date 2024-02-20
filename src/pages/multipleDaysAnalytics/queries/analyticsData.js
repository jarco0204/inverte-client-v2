export const getDay = /* GraphQL */ `
    query GetDay($dayOfYear_iotNameThing: ID!) {
        getDay(dayOfYear_iotNameThing: $dayOfYear_iotNameThing) {
            dayOfYear_iotNameThing
            weekOfYear_iotNameThing
            monthOfYear_iotNameThing
            year_iotNameThing
            dailySummary {
                averageTime
                portionsCompleted
                accuracy
                inventoryConsumed
                overServed
                underServed
                perfect
                day {
                    dayOfYear_iotNameThing
                    weekOfYear_iotNameThing
                    monthOfYear_iotNameThing
                    year_iotNameThing
                    realTime
                    dashboardGraph
                    scaleActions
                    allPortionEvents
                    createdAt
                    updatedAt
                    __typename
                }
                precision
                __typename
            }
            realTime
            dashboardGraph
            scaleActions
            allPortionEvents
            createdAt
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
            updatedAt
            __typename
        }
    }
`;
export const getDayNahr7tobjjdgpgohp2eptkayfeStaging = /* GraphQL */ `
    query GetDayNahr7tobjjdgpgohp2eptkayfeStaging($dayOfYear_iotNameThing: ID!) {
        getDayNahr7tobjjdgpgohp2eptkayfeStaging(dayOfYear_iotNameThing: $dayOfYear_iotNameThing) {
            dayOfYear_iotNameThing
            weekOfYear_iotNameThing
            monthOfYear_iotNameThing
            year_iotNameThing
            dailySummary {
                averageTime
                portionsCompleted
                accuracy
                inventoryConsumed
                overServed
                underServed
                perfect
                day {
                    dayOfYear_iotNameThing
                    weekOfYear_iotNameThing
                    monthOfYear_iotNameThing
                    year_iotNameThing
                    realTime
                    dashboardGraph
                    scaleActions
                    allPortionEvents
                    createdAt
                    updatedAt
                    __typename
                }
                precision
                __typename
            }
            realTime
            dashboardGraph
            scaleActions
            allPortionEvents
            createdAt
            hour {
                items {
                    dayOfYear_hourOfDay_iotNameThing
                    dayOfYear_iotNameThing
                    hourlySummary {
                        precision
                        accuracy
                        portionsCompleted
                        inventoryConsumed
                    }
                    __typename
                }
                nextToken
                __typename
            }
            __typename
        }
    }
`;
