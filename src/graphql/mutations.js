/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRestaurant = /* GraphQL */ `
  mutation CreateRestaurant(
    $input: CreateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    createRestaurant(input: $input, condition: $condition) {
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
export const updateRestaurant = /* GraphQL */ `
  mutation UpdateRestaurant(
    $input: UpdateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    updateRestaurant(input: $input, condition: $condition) {
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
export const deleteRestaurant = /* GraphQL */ `
  mutation DeleteRestaurant(
    $input: DeleteRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    deleteRestaurant(input: $input, condition: $condition) {
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
export const createScale = /* GraphQL */ `
  mutation CreateScale(
    $input: CreateScaleInput!
    $condition: ModelScaleConditionInput
  ) {
    createScale(input: $input, condition: $condition) {
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
export const updateScale = /* GraphQL */ `
  mutation UpdateScale(
    $input: UpdateScaleInput!
    $condition: ModelScaleConditionInput
  ) {
    updateScale(input: $input, condition: $condition) {
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
export const deleteScale = /* GraphQL */ `
  mutation DeleteScale(
    $input: DeleteScaleInput!
    $condition: ModelScaleConditionInput
  ) {
    deleteScale(input: $input, condition: $condition) {
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
export const createDay = /* GraphQL */ `
  mutation CreateDay(
    $input: CreateDayInput!
    $condition: ModelDayConditionInput
  ) {
    createDay(input: $input, condition: $condition) {
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
export const updateDay = /* GraphQL */ `
  mutation UpdateDay(
    $input: UpdateDayInput!
    $condition: ModelDayConditionInput
  ) {
    updateDay(input: $input, condition: $condition) {
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
export const deleteDay = /* GraphQL */ `
  mutation DeleteDay(
    $input: DeleteDayInput!
    $condition: ModelDayConditionInput
  ) {
    deleteDay(input: $input, condition: $condition) {
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
export const createHour = /* GraphQL */ `
  mutation CreateHour(
    $input: CreateHourInput!
    $condition: ModelHourConditionInput
  ) {
    createHour(input: $input, condition: $condition) {
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
export const updateHour = /* GraphQL */ `
  mutation UpdateHour(
    $input: UpdateHourInput!
    $condition: ModelHourConditionInput
  ) {
    updateHour(input: $input, condition: $condition) {
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
export const deleteHour = /* GraphQL */ `
  mutation DeleteHour(
    $input: DeleteHourInput!
    $condition: ModelHourConditionInput
  ) {
    deleteHour(input: $input, condition: $condition) {
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
