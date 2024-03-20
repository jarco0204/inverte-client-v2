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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const updateHour = /* GraphQL */ `
  mutation UpdateHour(
    $input: UpdateHourInput!
    $condition: ModelHourConditionInput
  ) {
    updateHour(input: $input, condition: $condition) {
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
export const deleteHour = /* GraphQL */ `
  mutation DeleteHour(
    $input: DeleteHourInput!
    $condition: ModelHourConditionInput
  ) {
    deleteHour(input: $input, condition: $condition) {
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
