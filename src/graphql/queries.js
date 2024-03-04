/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDayNahr7tobjjdgpgohp2eptkayfeStaging = /* GraphQL */ `
  query GetDayNahr7tobjjdgpgohp2eptkayfeStaging($dayOfYear_iotNameThing: ID!) {
    getDayNahr7tobjjdgpgohp2eptkayfeStaging(
      dayOfYear_iotNameThing: $dayOfYear_iotNameThing
    ) {
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
      __typename
    }
  }
`;
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
export const getScale = /* GraphQL */ `
  query GetScale($scaleName: ID!) {
    getScale(scaleName: $scaleName) {
      scaleName
      restaurant_id
      ingredient
      lastConnected
      createdAt
      updatedAt
      restaurantScaleRestaurant_id
      __typename
    }
  }
`;
export const listScales = /* GraphQL */ `
  query ListScales(
    $scaleName: ID
    $filter: ModelScaleFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listScales(
      scaleName: $scaleName
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
        realTime
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
  query ScalesByRestaurant_id(
    $restaurant_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelScaleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    scalesByRestaurant_id(
      restaurant_id: $restaurant_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        realTime
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
