/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onNewPortionEvent = /* GraphQL */ `
  subscription OnNewPortionEvent {
    onNewPortionEvent {
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
        mistake
        __typename
      }
      portionSize1 {
        averageTime
        portionsCompleted
        accuracy
        inventoryConsumed
        overServed
        underServed
        perfect
        precision
        mistake
        __typename
      }
      portionSize2 {
        averageTime
        portionsCompleted
        accuracy
        inventoryConsumed
        overServed
        underServed
        perfect
        precision
        mistake
        __typename
      }
      portionSize3 {
        averageTime
        portionsCompleted
        accuracy
        inventoryConsumed
        overServed
        underServed
        perfect
        precision
        mistake
        __typename
      }
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
export const onCreateRestaurant = /* GraphQL */ `
  subscription OnCreateRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
  ) {
    onCreateRestaurant(filter: $filter) {
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
      user {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateRestaurant = /* GraphQL */ `
  subscription OnUpdateRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
  ) {
    onUpdateRestaurant(filter: $filter) {
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
      user {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteRestaurant = /* GraphQL */ `
  subscription OnDeleteRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
  ) {
    onDeleteRestaurant(filter: $filter) {
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
      user {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateScale = /* GraphQL */ `
  subscription OnCreateScale($filter: ModelSubscriptionScaleFilterInput) {
    onCreateScale(filter: $filter) {
      scaleName
      restaurant_id
      restaurantName
      ingredient
      lastConnected
      inventoryWeight
      createdAt
      updatedAt
      restaurantScaleRestaurant_id
      __typename
    }
  }
`;
export const onUpdateScale = /* GraphQL */ `
  subscription OnUpdateScale($filter: ModelSubscriptionScaleFilterInput) {
    onUpdateScale(filter: $filter) {
      scaleName
      restaurant_id
      restaurantName
      ingredient
      lastConnected
      inventoryWeight
      createdAt
      updatedAt
      restaurantScaleRestaurant_id
      __typename
    }
  }
`;
export const onDeleteScale = /* GraphQL */ `
  subscription OnDeleteScale($filter: ModelSubscriptionScaleFilterInput) {
    onDeleteScale(filter: $filter) {
      scaleName
      restaurant_id
      restaurantName
      ingredient
      lastConnected
      inventoryWeight
      createdAt
      updatedAt
      restaurantScaleRestaurant_id
      __typename
    }
  }
`;
export const onCreateDay = /* GraphQL */ `
  subscription OnCreateDay($filter: ModelSubscriptionDayFilterInput) {
    onCreateDay(filter: $filter) {
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
        mistake
        __typename
      }
      portionSize1 {
        averageTime
        portionsCompleted
        accuracy
        inventoryConsumed
        overServed
        underServed
        perfect
        precision
        mistake
        __typename
      }
      portionSize2 {
        averageTime
        portionsCompleted
        accuracy
        inventoryConsumed
        overServed
        underServed
        perfect
        precision
        mistake
        __typename
      }
      portionSize3 {
        averageTime
        portionsCompleted
        accuracy
        inventoryConsumed
        overServed
        underServed
        perfect
        precision
        mistake
        __typename
      }
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
export const onUpdateDay = /* GraphQL */ `
  subscription OnUpdateDay($filter: ModelSubscriptionDayFilterInput) {
    onUpdateDay(filter: $filter) {
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
        mistake
        __typename
      }
      portionSize1 {
        averageTime
        portionsCompleted
        accuracy
        inventoryConsumed
        overServed
        underServed
        perfect
        precision
        mistake
        __typename
      }
      portionSize2 {
        averageTime
        portionsCompleted
        accuracy
        inventoryConsumed
        overServed
        underServed
        perfect
        precision
        mistake
        __typename
      }
      portionSize3 {
        averageTime
        portionsCompleted
        accuracy
        inventoryConsumed
        overServed
        underServed
        perfect
        precision
        mistake
        __typename
      }
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
export const onDeleteDay = /* GraphQL */ `
  subscription OnDeleteDay($filter: ModelSubscriptionDayFilterInput) {
    onDeleteDay(filter: $filter) {
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
        mistake
        __typename
      }
      portionSize1 {
        averageTime
        portionsCompleted
        accuracy
        inventoryConsumed
        overServed
        underServed
        perfect
        precision
        mistake
        __typename
      }
      portionSize2 {
        averageTime
        portionsCompleted
        accuracy
        inventoryConsumed
        overServed
        underServed
        perfect
        precision
        mistake
        __typename
      }
      portionSize3 {
        averageTime
        portionsCompleted
        accuracy
        inventoryConsumed
        overServed
        underServed
        perfect
        precision
        mistake
        __typename
      }
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
export const onCreateHour = /* GraphQL */ `
  subscription OnCreateHour($filter: ModelSubscriptionHourFilterInput) {
    onCreateHour(filter: $filter) {
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
      portionSize1 {
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
      portionSize2 {
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
      portionSize3 {
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
export const onUpdateHour = /* GraphQL */ `
  subscription OnUpdateHour($filter: ModelSubscriptionHourFilterInput) {
    onUpdateHour(filter: $filter) {
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
      portionSize1 {
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
      portionSize2 {
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
      portionSize3 {
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
export const onDeleteHour = /* GraphQL */ `
  subscription OnDeleteHour($filter: ModelSubscriptionHourFilterInput) {
    onDeleteHour(filter: $filter) {
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
      portionSize1 {
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
      portionSize2 {
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
      portionSize3 {
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
