/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRestaurant = /* GraphQL */ `
    query GetRestaurant($restaurant_id: ID!) {
        getRestaurant(restaurant_id: $restaurant_id) {
            restaurant_id
            demo
            iotThingNames
            restaurantLocationNum
            displayIngredient
            restaurantName
            unitOfMass
            timeZone
            accessType
            scale {
                items {
                    iotNameThing
                    restaurant_id
                    unitOfMass
                    multiplier
                    firmwareVersion
                    createdAt
                    updatedAt
                    restaurantScaleRestaurant_id
                    __typename
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
                iotThingNames
                restaurantLocationNum
                displayIngredient
                restaurantName
                unitOfMass
                timeZone
                accessType
                scale {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const getScale = /* GraphQL */ `
    query GetScale($iotNameThing: ID!) {
        getScale(iotNameThing: $iotNameThing) {
            iotNameThing
            restaurant_id
            unitOfMass
            multiplier
            firmwareVersion
            ingredient {
                items {
                    ingredient_name
                    iotNameThing
                    createdAt
                    updatedAt
                    scaleIngredientIotNameThing
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            restaurantScaleRestaurant_id
            __typename
        }
    }
`;
export const listScales = /* GraphQL */ `
    query ListScales($iotNameThing: ID, $filter: ModelScaleFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listScales(iotNameThing: $iotNameThing, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
            items {
                iotNameThing
                restaurant_id
                unitOfMass
                multiplier
                firmwareVersion
                ingredient {
                    nextToken
                    __typename
                }
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
export const getIngredient = /* GraphQL */ `
    query GetIngredient($ingredient_name: ID!) {
        getIngredient(ingredient_name: $ingredient_name) {
            ingredient_name
            iotNameThing
            year {
                items {
                    year_iotNameThing
                    ingredientName_weight
                    lastConnected
                    scaleActions
                    createdAt
                    updatedAt
                    ingredientYearIngredient_name
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            scaleIngredientIotNameThing
            __typename
        }
    }
    query GetIngredient($ingredient_name: ID!) {
        getIngredient(ingredient_name: $ingredient_name) {
            ingredient_name
            iotNameThing
            year {
                items {
                    year_iotNameThing
                    ingredientName_weight
                    scaleActions
                    lastConnected
                    createdAt
                    updatedAt
                    ingredientYearIngredient_name
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            scaleIngredientIotNameThing
            __typename
        }
    }
`;
export const listIngredients = /* GraphQL */ `
    query ListIngredients($ingredient_name: ID, $filter: ModelIngredientFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listIngredients(ingredient_name: $ingredient_name, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
            items {
                ingredient_name
                iotNameThing
                year {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                scaleIngredientIotNameThing
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const getYear = /* GraphQL */ `
    query GetYear($year_iotNameThing: ID!) {
        getYear(year_iotNameThing: $year_iotNameThing) {
            year_iotNameThing
            ingredientName_weight
            lastConnected
            yearlySummary {
                averageTime
                portionsCompleted
                accuracy
                inventoryConsumed
                overServed
                underServed
                perfect
                year {
                    year_iotNameThing
                    ingredientName_weight
                    lastConnected
                    scaleActions
                    createdAt
                    updatedAt
                    ingredientYearIngredient_name
                    __typename
                }
                __typename
            }
            scaleActions
            month {
                items {
                    monthOfYear_iotNameThing
                    year_iotNameThing
                    scaleActions
                    createdAt
                    updatedAt
                    yearMonthYear_iotNameThing
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            ingredientYearIngredient_name
            __typename
        }
    }
    query GetYear($year_iotNameThing: ID!) {
        getYear(year_iotNameThing: $year_iotNameThing) {
            year_iotNameThing
            ingredientName_weight
            yearlySummary {
                averageTime
                portionsCompleted
                accuracy
                inventoryConsumed
                overServed
                underServed
                perfect
                year {
                    year_iotNameThing
                    ingredientName_weight
                    scaleActions
                    lastConnected
                    createdAt
                    updatedAt
                    ingredientYearIngredient_name
                    __typename
                }
                __typename
            }
            scaleActions
            lastConnected
            month {
                items {
                    monthOfYear_iotNameThing
                    year_iotNameThing
                    scaleActions
                    createdAt
                    updatedAt
                    yearMonthYear_iotNameThing
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            ingredientYearIngredient_name
            __typename
        }
    }
`;
export const listYears = /* GraphQL */ `
    query ListYears($year_iotNameThing: ID, $filter: ModelYearFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listYears(year_iotNameThing: $year_iotNameThing, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
            items {
                year_iotNameThing
                ingredientName_weight
                lastConnected
                yearlySummary {
                    averageTime
                    portionsCompleted
                    accuracy
                    inventoryConsumed
                    overServed
                    underServed
                    perfect
                    __typename
                }
                scaleActions
                month {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                ingredientYearIngredient_name
                __typename
            }
            nextToken
            __typename
        }
    }
    query ListYears($year_iotNameThing: ID, $filter: ModelYearFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listYears(year_iotNameThing: $year_iotNameThing, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
            items {
                year_iotNameThing
                ingredientName_weight
                yearlySummary {
                    averageTime
                    portionsCompleted
                    accuracy
                    inventoryConsumed
                    overServed
                    underServed
                    perfect
                    __typename
                }
                scaleActions
                lastConnected
                month {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                ingredientYearIngredient_name
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const getMonth = /* GraphQL */ `
    query GetMonth($monthOfYear_iotNameThing: ID!) {
        getMonth(monthOfYear_iotNameThing: $monthOfYear_iotNameThing) {
            monthOfYear_iotNameThing
            year_iotNameThing
            monthlySummary {
                averageTime
                portionsCompleted
                accuracy
                inventoryConsumed
                overServed
                underServed
                perfect
                month {
                    monthOfYear_iotNameThing
                    year_iotNameThing
                    scaleActions
                    createdAt
                    updatedAt
                    yearMonthYear_iotNameThing
                    __typename
                }
                __typename
            }
            scaleActions
            week {
                items {
                    weekOfYear_iotNameThing
                    monthOfYear_iotNameThing
                    scaleActions
                    createdAt
                    updatedAt
                    monthWeekMonthOfYear_iotNameThing
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            yearMonthYear_iotNameThing
            __typename
        }
    }
`;
export const listMonths = /* GraphQL */ `
    query ListMonths($monthOfYear_iotNameThing: ID, $filter: ModelMonthFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listMonths(monthOfYear_iotNameThing: $monthOfYear_iotNameThing, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
            items {
                monthOfYear_iotNameThing
                year_iotNameThing
                monthlySummary {
                    averageTime
                    portionsCompleted
                    accuracy
                    inventoryConsumed
                    overServed
                    underServed
                    perfect
                    __typename
                }
                scaleActions
                week {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                yearMonthYear_iotNameThing
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const getWeek = /* GraphQL */ `
    query GetWeek($weekOfYear_iotNameThing: ID!) {
        getWeek(weekOfYear_iotNameThing: $weekOfYear_iotNameThing) {
            weekOfYear_iotNameThing
            monthOfYear_iotNameThing
            weeklySummary {
                averageTime
                portionsCompleted
                accuracy
                inventoryConsumed
                overServed
                underServed
                perfect
                week {
                    weekOfYear_iotNameThing
                    monthOfYear_iotNameThing
                    scaleActions
                    createdAt
                    updatedAt
                    monthWeekMonthOfYear_iotNameThing
                    __typename
                }
                __typename
            }
            scaleActions
            day {
                items {
                    dayOfYear_iotNameThing
                    weekOfYear_iotNameThing
                    realTime
                    dashboardGraph
                    scaleActions
                    allPortionEvents
                    createdAt
                    updatedAt
                    weekDayWeekOfYear_iotNameThing
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            monthWeekMonthOfYear_iotNameThing
            __typename
        }
    }
`;
export const listWeeks = /* GraphQL */ `
    query ListWeeks($weekOfYear_iotNameThing: ID, $filter: ModelWeekFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listWeeks(weekOfYear_iotNameThing: $weekOfYear_iotNameThing, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
            items {
                weekOfYear_iotNameThing
                monthOfYear_iotNameThing
                weeklySummary {
                    averageTime
                    portionsCompleted
                    accuracy
                    inventoryConsumed
                    overServed
                    underServed
                    perfect
                    __typename
                }
                scaleActions
                day {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                monthWeekMonthOfYear_iotNameThing
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const getDay = /* GraphQL */ `
    query GetDay($dayOfYear_iotNameThing: ID!) {
        getDay(dayOfYear_iotNameThing: $dayOfYear_iotNameThing) {
            dayOfYear_iotNameThing
            weekOfYear_iotNameThing
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
                    realTime
                    dashboardGraph
                    scaleActions
                    allPortionEvents
                    createdAt
                    updatedAt
                    weekDayWeekOfYear_iotNameThing
                    __typename
                }
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
                    __typename
                }
                nextToken
                __typename
            }
            updatedAt
            weekDayWeekOfYear_iotNameThing
            __typename
        }
    }
`;
export const listDays = /* GraphQL */ `
    query ListDays($dayOfYear_iotNameThing: ID, $filter: ModelDayFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listDays(dayOfYear_iotNameThing: $dayOfYear_iotNameThing, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
            items {
                dayOfYear_iotNameThing
                weekOfYear_iotNameThing
                dailySummary {
                    averageTime
                    portionsCompleted
                    accuracy
                    inventoryConsumed
                    overServed
                    underServed
                    perfect
                    __typename
                }
                realTime
                dashboardGraph
                scaleActions
                allPortionEvents
                createdAt
                hour {
                    nextToken
                    __typename
                }
                updatedAt
                weekDayWeekOfYear_iotNameThing
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const getHour = /* GraphQL */ `
    query GetHour($dayOfYear_hourOfDay_iotNameThing: ID!) {
        getHour(dayOfYear_hourOfDay_iotNameThing: $dayOfYear_hourOfDay_iotNameThing) {
            dayOfYear_hourOfDay_iotNameThing
            dayOfYear_iotNameThing
            hourlySummary {
                averageTime
                portionsCompleted
                accuracy
                inventoryConsumed
                overServed
                underServed
                perfect
                hour {
                    dayOfYear_hourOfDay_iotNameThing
                    dayOfYear_iotNameThing
                    realTime
                    scaleActions
                    createdAt
                    updatedAt
                    dayHourDayOfYear_iotNameThing
                    __typename
                }
                __typename
            }
            realTime
            scaleActions
            createdAt
            updatedAt
            dayHourDayOfYear_iotNameThing
            __typename
        }
    }
`;
export const listHours = /* GraphQL */ `
    query ListHours($dayOfYear_hourOfDay_iotNameThing: ID, $filter: ModelHourFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listHours(dayOfYear_hourOfDay_iotNameThing: $dayOfYear_hourOfDay_iotNameThing, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
            items {
                dayOfYear_hourOfDay_iotNameThing
                dayOfYear_iotNameThing
                hourlySummary {
                    averageTime
                    portionsCompleted
                    accuracy
                    inventoryConsumed
                    overServed
                    underServed
                    perfect
                    __typename
                }
                realTime
                scaleActions
                createdAt
                updatedAt
                dayHourDayOfYear_iotNameThing
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
                iotNameThing
                restaurant_id
                unitOfMass
                multiplier
                firmwareVersion
                ingredient {
                    nextToken
                    __typename
                }
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
export const ingredientsByIotNameThing = /* GraphQL */ `
    query IngredientsByIotNameThing($iotNameThing: ID!, $sortDirection: ModelSortDirection, $filter: ModelIngredientFilterInput, $limit: Int, $nextToken: String) {
        ingredientsByIotNameThing(iotNameThing: $iotNameThing, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                ingredient_name
                iotNameThing
                year {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                scaleIngredientIotNameThing
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const yearsByIngredientName_weight = /* GraphQL */ `
    query YearsByIngredientName_weight($ingredientName_weight: ID!, $sortDirection: ModelSortDirection, $filter: ModelYearFilterInput, $limit: Int, $nextToken: String) {
        yearsByIngredientName_weight(ingredientName_weight: $ingredientName_weight, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                year_iotNameThing
                ingredientName_weight
                lastConnected
                yearlySummary {
                    averageTime
                    portionsCompleted
                    accuracy
                    inventoryConsumed
                    overServed
                    underServed
                    perfect
                    __typename
                }
                scaleActions
                month {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                ingredientYearIngredient_name
                __typename
            }
            nextToken
            __typename
        }
    }
    query YearsByIngredientName_weight($ingredientName_weight: ID!, $sortDirection: ModelSortDirection, $filter: ModelYearFilterInput, $limit: Int, $nextToken: String) {
        yearsByIngredientName_weight(ingredientName_weight: $ingredientName_weight, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                year_iotNameThing
                ingredientName_weight
                yearlySummary {
                    averageTime
                    portionsCompleted
                    accuracy
                    inventoryConsumed
                    overServed
                    underServed
                    perfect
                    __typename
                }
                scaleActions
                lastConnected
                month {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                ingredientYearIngredient_name
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const monthsByYear_iotNameThing = /* GraphQL */ `
    query MonthsByYear_iotNameThing($year_iotNameThing: ID!, $sortDirection: ModelSortDirection, $filter: ModelMonthFilterInput, $limit: Int, $nextToken: String) {
        monthsByYear_iotNameThing(year_iotNameThing: $year_iotNameThing, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                monthOfYear_iotNameThing
                year_iotNameThing
                monthlySummary {
                    averageTime
                    portionsCompleted
                    accuracy
                    inventoryConsumed
                    overServed
                    underServed
                    perfect
                    __typename
                }
                scaleActions
                week {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                yearMonthYear_iotNameThing
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const weeksByMonthOfYear_iotNameThing = /* GraphQL */ `
    query WeeksByMonthOfYear_iotNameThing($monthOfYear_iotNameThing: ID!, $sortDirection: ModelSortDirection, $filter: ModelWeekFilterInput, $limit: Int, $nextToken: String) {
        weeksByMonthOfYear_iotNameThing(monthOfYear_iotNameThing: $monthOfYear_iotNameThing, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                weekOfYear_iotNameThing
                monthOfYear_iotNameThing
                weeklySummary {
                    averageTime
                    portionsCompleted
                    accuracy
                    inventoryConsumed
                    overServed
                    underServed
                    perfect
                    __typename
                }
                scaleActions
                day {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                monthWeekMonthOfYear_iotNameThing
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const daysByWeekOfYear_iotNameThing = /* GraphQL */ `
    query DaysByWeekOfYear_iotNameThing($weekOfYear_iotNameThing: ID!, $sortDirection: ModelSortDirection, $filter: ModelDayFilterInput, $limit: Int, $nextToken: String) {
        daysByWeekOfYear_iotNameThing(weekOfYear_iotNameThing: $weekOfYear_iotNameThing, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                dayOfYear_iotNameThing
                weekOfYear_iotNameThing
                dailySummary {
                    averageTime
                    portionsCompleted
                    accuracy
                    inventoryConsumed
                    overServed
                    underServed
                    perfect
                    __typename
                }
                realTime
                dashboardGraph
                scaleActions
                allPortionEvents
                createdAt
                hour {
                    nextToken
                    __typename
                }
                updatedAt
                weekDayWeekOfYear_iotNameThing
                __typename
            }
            nextToken
            __typename
        }
    }
`;
export const hoursByDayOfYear_iotNameThing = /* GraphQL */ `
    query HoursByDayOfYear_iotNameThing($dayOfYear_iotNameThing: ID!, $sortDirection: ModelSortDirection, $filter: ModelHourFilterInput, $limit: Int, $nextToken: String) {
        hoursByDayOfYear_iotNameThing(dayOfYear_iotNameThing: $dayOfYear_iotNameThing, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                dayOfYear_hourOfDay_iotNameThing
                dayOfYear_iotNameThing
                hourlySummary {
                    averageTime
                    portionsCompleted
                    accuracy
                    inventoryConsumed
                    overServed
                    underServed
                    perfect
                    __typename
                }
                realTime
                scaleActions
                createdAt
                updatedAt
                dayHourDayOfYear_iotNameThing
                __typename
            }
            nextToken
            __typename
        }
    }
`;
