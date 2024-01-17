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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listRestaurants = /* GraphQL */ `
  query ListRestaurants(
    $restaurant_id: ID
    $filter: ModelRestaurantFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRestaurants(
      restaurant_id: $restaurant_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
        createdAt
        updatedAt
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
export const listDays = /* GraphQL */ `
  query ListDays(
    $dayOfYear_iotNameThing: ID
    $filter: ModelDayFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDays(
      dayOfYear_iotNameThing: $dayOfYear_iotNameThing
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
          precision
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getHour = /* GraphQL */ `
  query GetHour($dayOfYear_hourOfDay_iotNameThing: ID!) {
    getHour(
      dayOfYear_hourOfDay_iotNameThing: $dayOfYear_hourOfDay_iotNameThing
    ) {
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
        precision
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
  query ListHours(
    $dayOfYear_hourOfDay_iotNameThing: ID
    $filter: ModelHourFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listHours(
      dayOfYear_hourOfDay_iotNameThing: $dayOfYear_hourOfDay_iotNameThing
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
          precision
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
export const daysByWeekOfYear_iotNameThing = /* GraphQL */ `
  query DaysByWeekOfYear_iotNameThing(
    $weekOfYear_iotNameThing: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    daysByWeekOfYear_iotNameThing(
      weekOfYear_iotNameThing: $weekOfYear_iotNameThing
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          precision
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const hoursByDayOfYear_iotNameThing = /* GraphQL */ `
  query HoursByDayOfYear_iotNameThing(
    $dayOfYear_iotNameThing: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHourFilterInput
    $limit: Int
    $nextToken: String
  ) {
    hoursByDayOfYear_iotNameThing(
      dayOfYear_iotNameThing: $dayOfYear_iotNameThing
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
          precision
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
