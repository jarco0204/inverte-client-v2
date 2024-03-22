/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRestaurant = /* GraphQL */ `
    query GetRestaurant($restaurant_id: ID!) {
        getRestaurant(restaurant_id: $restaurant_id) {
            restaurant_id
            demo
            restaurantLocationNum
            displayIngredient
            restaurantName
            unitOfMass
            timeZone
            accessType
            scale {
                items {
                    scaleName
                    restaurant_id
                    ingredient
                    lastConnected
                    restaurantName
                    createdAt
                    updatedAt
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            __typename
        }
    }
`;
export const listRestaurants = /* GraphQL */ `
    query ListRestaurants($restaurant_id: ID, $filter: ModelRestaurantFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listRestaurants(restaurant_id: $restaurant_id, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
            items {
                restaurant_id
                demo
                restaurantLocationNum
                displayIngredient
                restaurantName
                unitOfMass
                timeZone
                accessType
                createdAt
                updatedAt
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const getUser = /* GraphQL */ `
    query GetUser($user_id: ID!) {
        getUser(user_id: $user_id) {
            user_id
            restaurant_id
            firstName
            lastName
            createdAt
            updatedAt
            restaurantUserRestaurant_id
            __typename
        }
    }
`;
export const listUsers = /* GraphQL */ `
    query ListUsers($user_id: ID, $filter: ModelUserFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listUsers(user_id: $user_id, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
            items {
                user_id
                restaurant_id
                firstName
                lastName
                createdAt
                updatedAt
                restaurantUserRestaurant_id
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const getScale = /* GraphQL */ `
    query GetScale($scaleName: ID!) {
        getScale(scaleName: $scaleName) {
            scaleName
            restaurant_id
            ingredient
            restaurantName
            lastConnected
            createdAt
            updatedAt
            restaurantScaleRestaurant_id
            __typename
        }
    }
`;
export const listScales = /* GraphQL */ `
    query ListScales($scaleName: ID, $filter: ModelScaleFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listScales(scaleName: $scaleName, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
            items {
                scaleName
                restaurant_id
                ingredient
                lastConnected
                restaurantName
                createdAt
                updatedAt
                restaurantScaleRestaurant_id
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const getDay = /* GraphQL */ `
    query GetDay($year_dayOfYear_iotNameThing_ingredientName: ID!) {
        getDay(year_dayOfYear_iotNameThing_ingredientName: $year_dayOfYear_iotNameThing_ingredientName) {
            year_dayOfYear_iotNameThing_ingredientName
            weekOfYear_iotNameThing_ingredientName
            monthOfYear_iotNameThing_ingredientName
            year_iotNameThing_ingredientName
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
            dashboardGraph
            scaleActions
            allPortionEvents
            createdAt
            hour {
                items {
                    year_dayOfYear_hourOfDay_iotNameThing_ingredientName
                    year_dayOfYear_iotNameThing_ingredientName
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
                }
                nextToken
                __typename
            }
            updatedAt
            __typename
        }
    }
`;
export const listDays = /* GraphQL */ `
    query ListDays($year_dayOfYear_iotNameThing_ingredientName: ID, $filter: ModelDayFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listDays(year_dayOfYear_iotNameThing_ingredientName: $year_dayOfYear_iotNameThing_ingredientName, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
            items {
                year_dayOfYear_iotNameThing_ingredientName
                weekOfYear_iotNameThing_ingredientName
                monthOfYear_iotNameThing_ingredientName
                year_iotNameThing_ingredientName
                dashboardGraph
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
export const getHour = /* GraphQL */ `
    query GetHour($year_dayOfYear_hourOfDay_iotNameThing_ingredientName: ID!) {
        getHour(year_dayOfYear_hourOfDay_iotNameThing_ingredientName: $year_dayOfYear_hourOfDay_iotNameThing_ingredientName) {
            year_dayOfYear_hourOfDay_iotNameThing_ingredientName
            year_dayOfYear_iotNameThing_ingredientName
            hourlySummary {
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
            realTime
            scaleActions
            createdAt
            updatedAt
            dayHourYear_dayOfYear_iotNameThing_ingredientName
            __typename
        }
    }
`;
export const listHours = /* GraphQL */ `
    query ListHours($year_dayOfYear_hourOfDay_iotNameThing_ingredientName: ID, $filter: ModelHourFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listHours(
            year_dayOfYear_hourOfDay_iotNameThing_ingredientName: $year_dayOfYear_hourOfDay_iotNameThing_ingredientName
            filter: $filter
            limit: $limit
            nextToken: $nextToken
            sortDirection: $sortDirection
        ) {
            items {
                year_dayOfYear_hourOfDay_iotNameThing_ingredientName
                year_dayOfYear_iotNameThing_ingredientName
                realTime
                scaleActions
                createdAt
                updatedAt
                dayHourYear_dayOfYear_iotNameThing_ingredientName
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const usersByRestaurant_id = /* GraphQL */ `
    query UsersByRestaurant_id($restaurant_id: ID!, $sortDirection: ModelSortDirection, $filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
        usersByRestaurant_id(restaurant_id: $restaurant_id, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                user_id
                restaurant_id
                firstName
                lastName
                createdAt
                updatedAt
                restaurantUserRestaurant_id
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const scalesByRestaurant_id = /* GraphQL */ `
    query ScalesByRestaurant_id($restaurant_id: ID!, $sortDirection: ModelSortDirection, $filter: ModelScaleFilterInput, $limit: Int, $nextToken: String) {
        scalesByRestaurant_id(restaurant_id: $restaurant_id, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                scaleName
                restaurant_id
                ingredient
                lastConnected
                createdAt
                updatedAt
                restaurantScaleRestaurant_id
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const daysByWeekOfYear_iotNameThing_ingredientName = /* GraphQL */ `
    query DaysByWeekOfYear_iotNameThing_ingredientName(
        $weekOfYear_iotNameThing_ingredientName: ID!
        $sortDirection: ModelSortDirection
        $filter: ModelDayFilterInput
        $limit: Int
        $nextToken: String
    ) {
        daysByWeekOfYear_iotNameThing_ingredientName(
            weekOfYear_iotNameThing_ingredientName: $weekOfYear_iotNameThing_ingredientName
            sortDirection: $sortDirection
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                year_dayOfYear_iotNameThing_ingredientName
                weekOfYear_iotNameThing_ingredientName
                monthOfYear_iotNameThing_ingredientName
                year_iotNameThing_ingredientName
                dashboardGraph
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
export const daysByMonthOfYear_iotNameThing_ingredientName = /* GraphQL */ `
    query DaysByMonthOfYear_iotNameThing_ingredientName(
        $monthOfYear_iotNameThing_ingredientName: ID!
        $sortDirection: ModelSortDirection
        $filter: ModelDayFilterInput
        $limit: Int
        $nextToken: String
    ) {
        daysByMonthOfYear_iotNameThing_ingredientName(
            monthOfYear_iotNameThing_ingredientName: $monthOfYear_iotNameThing_ingredientName
            sortDirection: $sortDirection
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                year_dayOfYear_iotNameThing_ingredientName
                weekOfYear_iotNameThing_ingredientName
                monthOfYear_iotNameThing_ingredientName
                year_iotNameThing_ingredientName
                dashboardGraph
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
export const hoursByYear_dayOfYear_iotNameThing_ingredientName = /* GraphQL */ `
    query HoursByYear_dayOfYear_iotNameThing_ingredientName(
        $year_dayOfYear_iotNameThing_ingredientName: ID!
        $sortDirection: ModelSortDirection
        $filter: ModelHourFilterInput
        $limit: Int
        $nextToken: String
    ) {
        hoursByYear_dayOfYear_iotNameThing_ingredientName(
            year_dayOfYear_iotNameThing_ingredientName: $year_dayOfYear_iotNameThing_ingredientName
            sortDirection: $sortDirection
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                year_dayOfYear_hourOfDay_iotNameThing_ingredientName
                year_dayOfYear_iotNameThing_ingredientName
                realTime
                scaleActions
                createdAt
                updatedAt
                dayHourYear_dayOfYear_iotNameThing_ingredientName
                __typename
            }
            nextToken
            __typename
        }
    }
`;
