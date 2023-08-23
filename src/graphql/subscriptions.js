/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onNewPortionEvent = /* GraphQL */ `
  subscription OnNewPortionEvent {
    onNewPortionEvent {
      iotNameThing
      timestamp
      batchPortionID
      inventoryWeight
      batchPortionWeightAR
      batchPortionStatusAR
      ingredientName
      lowerErrorLimit
      upperErrorLimit
      correctWeight
      portionTimeTaken
      dayOfYear_hourOfDay_iotNameThing
      hour {
        dayOfYear_hourOfDay_iotNameThing
        dayOfYear_iotNameThing
        minuteOfHour_secondOfMinute
        hourlySummary {
          minutesSaved
          portionsCompleted
          accuracy
          inventoryConsumed
          __typename
        }
        realTime
        scaleActions
        createdAt
        portionEvent {
          nextToken
          __typename
        }
        updatedAt
        dayHourDayOfYear_iotNameThing
        __typename
      }
      createdAt
      updatedAt
      hourPortionEventDayOfYear_hourOfDay_iotNameThing
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
export const onCreateScale = /* GraphQL */ `
  subscription OnCreateScale($filter: ModelSubscriptionScaleFilterInput) {
    onCreateScale(filter: $filter) {
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
export const onUpdateScale = /* GraphQL */ `
  subscription OnUpdateScale($filter: ModelSubscriptionScaleFilterInput) {
    onUpdateScale(filter: $filter) {
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
export const onDeleteScale = /* GraphQL */ `
  subscription OnDeleteScale($filter: ModelSubscriptionScaleFilterInput) {
    onDeleteScale(filter: $filter) {
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
export const onCreateIngredient = /* GraphQL */ `
  subscription OnCreateIngredient(
    $filter: ModelSubscriptionIngredientFilterInput
  ) {
    onCreateIngredient(filter: $filter) {
      ingredient_name
      iotNameThing
      year {
        items {
          year_iotNameThing
          ingredientName_weight
          realTime
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
`;
export const onUpdateIngredient = /* GraphQL */ `
  subscription OnUpdateIngredient(
    $filter: ModelSubscriptionIngredientFilterInput
  ) {
    onUpdateIngredient(filter: $filter) {
      ingredient_name
      iotNameThing
      year {
        items {
          year_iotNameThing
          ingredientName_weight
          realTime
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
`;
export const onDeleteIngredient = /* GraphQL */ `
  subscription OnDeleteIngredient(
    $filter: ModelSubscriptionIngredientFilterInput
  ) {
    onDeleteIngredient(filter: $filter) {
      ingredient_name
      iotNameThing
      year {
        items {
          year_iotNameThing
          ingredientName_weight
          realTime
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
`;
export const onCreateYear = /* GraphQL */ `
  subscription OnCreateYear($filter: ModelSubscriptionYearFilterInput) {
    onCreateYear(filter: $filter) {
      year_iotNameThing
      ingredientName_weight
      yearlySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        year {
          year_iotNameThing
          ingredientName_weight
          realTime
          scaleActions
          createdAt
          updatedAt
          ingredientYearIngredient_name
          __typename
        }
        __typename
      }
      realTime
      scaleActions
      month {
        items {
          monthOfYear_iotNameThing
          year_iotNameThing
          realTime
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
export const onUpdateYear = /* GraphQL */ `
  subscription OnUpdateYear($filter: ModelSubscriptionYearFilterInput) {
    onUpdateYear(filter: $filter) {
      year_iotNameThing
      ingredientName_weight
      yearlySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        year {
          year_iotNameThing
          ingredientName_weight
          realTime
          scaleActions
          createdAt
          updatedAt
          ingredientYearIngredient_name
          __typename
        }
        __typename
      }
      realTime
      scaleActions
      month {
        items {
          monthOfYear_iotNameThing
          year_iotNameThing
          realTime
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
export const onDeleteYear = /* GraphQL */ `
  subscription OnDeleteYear($filter: ModelSubscriptionYearFilterInput) {
    onDeleteYear(filter: $filter) {
      year_iotNameThing
      ingredientName_weight
      yearlySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        year {
          year_iotNameThing
          ingredientName_weight
          realTime
          scaleActions
          createdAt
          updatedAt
          ingredientYearIngredient_name
          __typename
        }
        __typename
      }
      realTime
      scaleActions
      month {
        items {
          monthOfYear_iotNameThing
          year_iotNameThing
          realTime
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
export const onCreateMonth = /* GraphQL */ `
  subscription OnCreateMonth($filter: ModelSubscriptionMonthFilterInput) {
    onCreateMonth(filter: $filter) {
      monthOfYear_iotNameThing
      year_iotNameThing
      monthlySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        month {
          monthOfYear_iotNameThing
          year_iotNameThing
          realTime
          scaleActions
          createdAt
          updatedAt
          yearMonthYear_iotNameThing
          __typename
        }
        __typename
      }
      realTime
      scaleActions
      week {
        items {
          weekOfYear_iotNameThing
          monthOfYear_iotNameThing
          realTime
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
export const onUpdateMonth = /* GraphQL */ `
  subscription OnUpdateMonth($filter: ModelSubscriptionMonthFilterInput) {
    onUpdateMonth(filter: $filter) {
      monthOfYear_iotNameThing
      year_iotNameThing
      monthlySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        month {
          monthOfYear_iotNameThing
          year_iotNameThing
          realTime
          scaleActions
          createdAt
          updatedAt
          yearMonthYear_iotNameThing
          __typename
        }
        __typename
      }
      realTime
      scaleActions
      week {
        items {
          weekOfYear_iotNameThing
          monthOfYear_iotNameThing
          realTime
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
export const onDeleteMonth = /* GraphQL */ `
  subscription OnDeleteMonth($filter: ModelSubscriptionMonthFilterInput) {
    onDeleteMonth(filter: $filter) {
      monthOfYear_iotNameThing
      year_iotNameThing
      monthlySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        month {
          monthOfYear_iotNameThing
          year_iotNameThing
          realTime
          scaleActions
          createdAt
          updatedAt
          yearMonthYear_iotNameThing
          __typename
        }
        __typename
      }
      realTime
      scaleActions
      week {
        items {
          weekOfYear_iotNameThing
          monthOfYear_iotNameThing
          realTime
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
export const onCreateWeek = /* GraphQL */ `
  subscription OnCreateWeek($filter: ModelSubscriptionWeekFilterInput) {
    onCreateWeek(filter: $filter) {
      weekOfYear_iotNameThing
      monthOfYear_iotNameThing
      weeklySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        week {
          weekOfYear_iotNameThing
          monthOfYear_iotNameThing
          realTime
          scaleActions
          createdAt
          updatedAt
          monthWeekMonthOfYear_iotNameThing
          __typename
        }
        __typename
      }
      realTime
      scaleActions
      day {
        items {
          dayOfYear_iotNameThing
          weekOfYear_iotNameThing
          realTime
          scaleActions
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
export const onUpdateWeek = /* GraphQL */ `
  subscription OnUpdateWeek($filter: ModelSubscriptionWeekFilterInput) {
    onUpdateWeek(filter: $filter) {
      weekOfYear_iotNameThing
      monthOfYear_iotNameThing
      weeklySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        week {
          weekOfYear_iotNameThing
          monthOfYear_iotNameThing
          realTime
          scaleActions
          createdAt
          updatedAt
          monthWeekMonthOfYear_iotNameThing
          __typename
        }
        __typename
      }
      realTime
      scaleActions
      day {
        items {
          dayOfYear_iotNameThing
          weekOfYear_iotNameThing
          realTime
          scaleActions
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
export const onDeleteWeek = /* GraphQL */ `
  subscription OnDeleteWeek($filter: ModelSubscriptionWeekFilterInput) {
    onDeleteWeek(filter: $filter) {
      weekOfYear_iotNameThing
      monthOfYear_iotNameThing
      weeklySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        week {
          weekOfYear_iotNameThing
          monthOfYear_iotNameThing
          realTime
          scaleActions
          createdAt
          updatedAt
          monthWeekMonthOfYear_iotNameThing
          __typename
        }
        __typename
      }
      realTime
      scaleActions
      day {
        items {
          dayOfYear_iotNameThing
          weekOfYear_iotNameThing
          realTime
          scaleActions
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
export const onCreateDay = /* GraphQL */ `
  subscription OnCreateDay($filter: ModelSubscriptionDayFilterInput) {
    onCreateDay(filter: $filter) {
      dayOfYear_iotNameThing
      weekOfYear_iotNameThing
      dailySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        day {
          dayOfYear_iotNameThing
          weekOfYear_iotNameThing
          realTime
          scaleActions
          createdAt
          updatedAt
          weekDayWeekOfYear_iotNameThing
          __typename
        }
        __typename
      }
      realTime
      scaleActions
      hour {
        items {
          dayOfYear_hourOfDay_iotNameThing
          dayOfYear_iotNameThing
          minuteOfHour_secondOfMinute
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
      createdAt
      updatedAt
      weekDayWeekOfYear_iotNameThing
      __typename
    }
  }
`;
export const onUpdateDay = /* GraphQL */ `
  subscription OnUpdateDay($filter: ModelSubscriptionDayFilterInput) {
    onUpdateDay(filter: $filter) {
      dayOfYear_iotNameThing
      weekOfYear_iotNameThing
      dailySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        day {
          dayOfYear_iotNameThing
          weekOfYear_iotNameThing
          realTime
          scaleActions
          createdAt
          updatedAt
          weekDayWeekOfYear_iotNameThing
          __typename
        }
        __typename
      }
      realTime
      scaleActions
      hour {
        items {
          dayOfYear_hourOfDay_iotNameThing
          dayOfYear_iotNameThing
          minuteOfHour_secondOfMinute
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
      createdAt
      updatedAt
      weekDayWeekOfYear_iotNameThing
      __typename
    }
  }
`;
export const onDeleteDay = /* GraphQL */ `
  subscription OnDeleteDay($filter: ModelSubscriptionDayFilterInput) {
    onDeleteDay(filter: $filter) {
      dayOfYear_iotNameThing
      weekOfYear_iotNameThing
      dailySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        day {
          dayOfYear_iotNameThing
          weekOfYear_iotNameThing
          realTime
          scaleActions
          createdAt
          updatedAt
          weekDayWeekOfYear_iotNameThing
          __typename
        }
        __typename
      }
      realTime
      scaleActions
      hour {
        items {
          dayOfYear_hourOfDay_iotNameThing
          dayOfYear_iotNameThing
          minuteOfHour_secondOfMinute
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
      createdAt
      updatedAt
      weekDayWeekOfYear_iotNameThing
      __typename
    }
  }
`;
export const onCreateHour = /* GraphQL */ `
  subscription OnCreateHour($filter: ModelSubscriptionHourFilterInput) {
    onCreateHour(filter: $filter) {
      dayOfYear_hourOfDay_iotNameThing
      dayOfYear_iotNameThing
      minuteOfHour_secondOfMinute
      hourlySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        hour {
          dayOfYear_hourOfDay_iotNameThing
          dayOfYear_iotNameThing
          minuteOfHour_secondOfMinute
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
      portionEvent {
        items {
          iotNameThing
          timestamp
          batchPortionID
          inventoryWeight
          batchPortionWeightAR
          batchPortionStatusAR
          ingredientName
          lowerErrorLimit
          upperErrorLimit
          correctWeight
          portionTimeTaken
          dayOfYear_hourOfDay_iotNameThing
          createdAt
          updatedAt
          hourPortionEventDayOfYear_hourOfDay_iotNameThing
          __typename
        }
        nextToken
        __typename
      }
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
      minuteOfHour_secondOfMinute
      hourlySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        hour {
          dayOfYear_hourOfDay_iotNameThing
          dayOfYear_iotNameThing
          minuteOfHour_secondOfMinute
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
      portionEvent {
        items {
          iotNameThing
          timestamp
          batchPortionID
          inventoryWeight
          batchPortionWeightAR
          batchPortionStatusAR
          ingredientName
          lowerErrorLimit
          upperErrorLimit
          correctWeight
          portionTimeTaken
          dayOfYear_hourOfDay_iotNameThing
          createdAt
          updatedAt
          hourPortionEventDayOfYear_hourOfDay_iotNameThing
          __typename
        }
        nextToken
        __typename
      }
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
      minuteOfHour_secondOfMinute
      hourlySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        hour {
          dayOfYear_hourOfDay_iotNameThing
          dayOfYear_iotNameThing
          minuteOfHour_secondOfMinute
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
      portionEvent {
        items {
          iotNameThing
          timestamp
          batchPortionID
          inventoryWeight
          batchPortionWeightAR
          batchPortionStatusAR
          ingredientName
          lowerErrorLimit
          upperErrorLimit
          correctWeight
          portionTimeTaken
          dayOfYear_hourOfDay_iotNameThing
          createdAt
          updatedAt
          hourPortionEventDayOfYear_hourOfDay_iotNameThing
          __typename
        }
        nextToken
        __typename
      }
      updatedAt
      dayHourDayOfYear_iotNameThing
      __typename
    }
  }
`;
export const onCreatePortionEvent = /* GraphQL */ `
  subscription OnCreatePortionEvent(
    $filter: ModelSubscriptionPortionEventFilterInput
  ) {
    onCreatePortionEvent(filter: $filter) {
      iotNameThing
      timestamp
      batchPortionID
      inventoryWeight
      batchPortionWeightAR
      batchPortionStatusAR
      ingredientName
      lowerErrorLimit
      upperErrorLimit
      correctWeight
      portionTimeTaken
      dayOfYear_hourOfDay_iotNameThing
      hour {
        dayOfYear_hourOfDay_iotNameThing
        dayOfYear_iotNameThing
        minuteOfHour_secondOfMinute
        hourlySummary {
          minutesSaved
          portionsCompleted
          accuracy
          inventoryConsumed
          __typename
        }
        realTime
        scaleActions
        createdAt
        portionEvent {
          nextToken
          __typename
        }
        updatedAt
        dayHourDayOfYear_iotNameThing
        __typename
      }
      createdAt
      updatedAt
      hourPortionEventDayOfYear_hourOfDay_iotNameThing
      __typename
    }
  }
`;
export const onUpdatePortionEvent = /* GraphQL */ `
  subscription OnUpdatePortionEvent(
    $filter: ModelSubscriptionPortionEventFilterInput
  ) {
    onUpdatePortionEvent(filter: $filter) {
      iotNameThing
      timestamp
      batchPortionID
      inventoryWeight
      batchPortionWeightAR
      batchPortionStatusAR
      ingredientName
      lowerErrorLimit
      upperErrorLimit
      correctWeight
      portionTimeTaken
      dayOfYear_hourOfDay_iotNameThing
      hour {
        dayOfYear_hourOfDay_iotNameThing
        dayOfYear_iotNameThing
        minuteOfHour_secondOfMinute
        hourlySummary {
          minutesSaved
          portionsCompleted
          accuracy
          inventoryConsumed
          __typename
        }
        realTime
        scaleActions
        createdAt
        portionEvent {
          nextToken
          __typename
        }
        updatedAt
        dayHourDayOfYear_iotNameThing
        __typename
      }
      createdAt
      updatedAt
      hourPortionEventDayOfYear_hourOfDay_iotNameThing
      __typename
    }
  }
`;
export const onDeletePortionEvent = /* GraphQL */ `
  subscription OnDeletePortionEvent(
    $filter: ModelSubscriptionPortionEventFilterInput
  ) {
    onDeletePortionEvent(filter: $filter) {
      iotNameThing
      timestamp
      batchPortionID
      inventoryWeight
      batchPortionWeightAR
      batchPortionStatusAR
      ingredientName
      lowerErrorLimit
      upperErrorLimit
      correctWeight
      portionTimeTaken
      dayOfYear_hourOfDay_iotNameThing
      hour {
        dayOfYear_hourOfDay_iotNameThing
        dayOfYear_iotNameThing
        minuteOfHour_secondOfMinute
        hourlySummary {
          minutesSaved
          portionsCompleted
          accuracy
          inventoryConsumed
          __typename
        }
        realTime
        scaleActions
        createdAt
        portionEvent {
          nextToken
          __typename
        }
        updatedAt
        dayHourDayOfYear_iotNameThing
        __typename
      }
      createdAt
      updatedAt
      hourPortionEventDayOfYear_hourOfDay_iotNameThing
      __typename
    }
  }
`;
