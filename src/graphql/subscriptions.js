/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onNewPortionEvent = /* GraphQL */ `
  subscription OnNewPortionEvent {
    onNewPortionEvent {
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
export const onCreateRestaurant = /* GraphQL */ `
  subscription OnCreateRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
  ) {
    onCreateRestaurant(filter: $filter) {
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
export const onUpdateRestaurant = /* GraphQL */ `
  subscription OnUpdateRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
  ) {
    onUpdateRestaurant(filter: $filter) {
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
export const onDeleteRestaurant = /* GraphQL */ `
  subscription OnDeleteRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
  ) {
    onDeleteRestaurant(filter: $filter) {
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
export const onCreateDay = /* GraphQL */ `
  subscription OnCreateDay($filter: ModelSubscriptionDayFilterInput) {
    onCreateDay(filter: $filter) {
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
export const onUpdateDay = /* GraphQL */ `
  subscription OnUpdateDay($filter: ModelSubscriptionDayFilterInput) {
    onUpdateDay(filter: $filter) {
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
export const onDeleteDay = /* GraphQL */ `
  subscription OnDeleteDay($filter: ModelSubscriptionDayFilterInput) {
    onDeleteDay(filter: $filter) {
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
export const onCreateHour = /* GraphQL */ `
  subscription OnCreateHour($filter: ModelSubscriptionHourFilterInput) {
    onCreateHour(filter: $filter) {
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
export const onUpdateHour = /* GraphQL */ `
  subscription OnUpdateHour($filter: ModelSubscriptionHourFilterInput) {
    onUpdateHour(filter: $filter) {
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
export const onDeleteHour = /* GraphQL */ `
  subscription OnDeleteHour($filter: ModelSubscriptionHourFilterInput) {
    onDeleteHour(filter: $filter) {
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
