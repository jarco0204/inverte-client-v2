/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRestaurant = /* GraphQL */ `
  mutation CreateRestaurant(
    $input: CreateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    createRestaurant(input: $input, condition: $condition) {
      restaurant_id
      displayIngredient
      restaurantName
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
export const updateRestaurant = /* GraphQL */ `
  mutation UpdateRestaurant(
    $input: UpdateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    updateRestaurant(input: $input, condition: $condition) {
      restaurant_id
      displayIngredient
      restaurantName
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
export const deleteRestaurant = /* GraphQL */ `
  mutation DeleteRestaurant(
    $input: DeleteRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    deleteRestaurant(input: $input, condition: $condition) {
      restaurant_id
      displayIngredient
      restaurantName
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
export const createScale = /* GraphQL */ `
  mutation CreateScale(
    $input: CreateScaleInput!
    $condition: ModelScaleConditionInput
  ) {
    createScale(input: $input, condition: $condition) {
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
export const updateScale = /* GraphQL */ `
  mutation UpdateScale(
    $input: UpdateScaleInput!
    $condition: ModelScaleConditionInput
  ) {
    updateScale(input: $input, condition: $condition) {
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
export const deleteScale = /* GraphQL */ `
  mutation DeleteScale(
    $input: DeleteScaleInput!
    $condition: ModelScaleConditionInput
  ) {
    deleteScale(input: $input, condition: $condition) {
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
export const createIngredient = /* GraphQL */ `
  mutation CreateIngredient(
    $input: CreateIngredientInput!
    $condition: ModelIngredientConditionInput
  ) {
    createIngredient(input: $input, condition: $condition) {
      ingredient_name
      iotNameThing
      year {
        items {
          year_iotNameThing
          ingredient_name
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
export const updateIngredient = /* GraphQL */ `
  mutation UpdateIngredient(
    $input: UpdateIngredientInput!
    $condition: ModelIngredientConditionInput
  ) {
    updateIngredient(input: $input, condition: $condition) {
      ingredient_name
      iotNameThing
      year {
        items {
          year_iotNameThing
          ingredient_name
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
export const deleteIngredient = /* GraphQL */ `
  mutation DeleteIngredient(
    $input: DeleteIngredientInput!
    $condition: ModelIngredientConditionInput
  ) {
    deleteIngredient(input: $input, condition: $condition) {
      ingredient_name
      iotNameThing
      year {
        items {
          year_iotNameThing
          ingredient_name
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
export const createYear = /* GraphQL */ `
  mutation CreateYear(
    $input: CreateYearInput!
    $condition: ModelYearConditionInput
  ) {
    createYear(input: $input, condition: $condition) {
      year_iotNameThing
      ingredient_name
      yearlySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        year {
          year_iotNameThing
          ingredient_name
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
export const updateYear = /* GraphQL */ `
  mutation UpdateYear(
    $input: UpdateYearInput!
    $condition: ModelYearConditionInput
  ) {
    updateYear(input: $input, condition: $condition) {
      year_iotNameThing
      ingredient_name
      yearlySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        year {
          year_iotNameThing
          ingredient_name
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
export const deleteYear = /* GraphQL */ `
  mutation DeleteYear(
    $input: DeleteYearInput!
    $condition: ModelYearConditionInput
  ) {
    deleteYear(input: $input, condition: $condition) {
      year_iotNameThing
      ingredient_name
      yearlySummary {
        minutesSaved
        portionsCompleted
        accuracy
        inventoryConsumed
        year {
          year_iotNameThing
          ingredient_name
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
export const createMonth = /* GraphQL */ `
  mutation CreateMonth(
    $input: CreateMonthInput!
    $condition: ModelMonthConditionInput
  ) {
    createMonth(input: $input, condition: $condition) {
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
export const updateMonth = /* GraphQL */ `
  mutation UpdateMonth(
    $input: UpdateMonthInput!
    $condition: ModelMonthConditionInput
  ) {
    updateMonth(input: $input, condition: $condition) {
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
export const deleteMonth = /* GraphQL */ `
  mutation DeleteMonth(
    $input: DeleteMonthInput!
    $condition: ModelMonthConditionInput
  ) {
    deleteMonth(input: $input, condition: $condition) {
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
export const createWeek = /* GraphQL */ `
  mutation CreateWeek(
    $input: CreateWeekInput!
    $condition: ModelWeekConditionInput
  ) {
    createWeek(input: $input, condition: $condition) {
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
export const updateWeek = /* GraphQL */ `
  mutation UpdateWeek(
    $input: UpdateWeekInput!
    $condition: ModelWeekConditionInput
  ) {
    updateWeek(input: $input, condition: $condition) {
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
export const deleteWeek = /* GraphQL */ `
  mutation DeleteWeek(
    $input: DeleteWeekInput!
    $condition: ModelWeekConditionInput
  ) {
    deleteWeek(input: $input, condition: $condition) {
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
export const createDay = /* GraphQL */ `
  mutation CreateDay(
    $input: CreateDayInput!
    $condition: ModelDayConditionInput
  ) {
    createDay(input: $input, condition: $condition) {
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
export const updateDay = /* GraphQL */ `
  mutation UpdateDay(
    $input: UpdateDayInput!
    $condition: ModelDayConditionInput
  ) {
    updateDay(input: $input, condition: $condition) {
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
export const deleteDay = /* GraphQL */ `
  mutation DeleteDay(
    $input: DeleteDayInput!
    $condition: ModelDayConditionInput
  ) {
    deleteDay(input: $input, condition: $condition) {
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
export const createHour = /* GraphQL */ `
  mutation CreateHour(
    $input: CreateHourInput!
    $condition: ModelHourConditionInput
  ) {
    createHour(input: $input, condition: $condition) {
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
      portionEvent {
        items {
          iotNameThing
          timestamp
          batchPortionID
          portionStatus
          portionWeight
          inventoryWeight
          batchPortionWeight
          batchPortionStatus
          LowerErrorLimit
          UpperErrorLimit
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
      portionEvent {
        items {
          iotNameThing
          timestamp
          batchPortionID
          portionStatus
          portionWeight
          inventoryWeight
          batchPortionWeight
          batchPortionStatus
          LowerErrorLimit
          UpperErrorLimit
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
      portionEvent {
        items {
          iotNameThing
          timestamp
          batchPortionID
          portionStatus
          portionWeight
          inventoryWeight
          batchPortionWeight
          batchPortionStatus
          LowerErrorLimit
          UpperErrorLimit
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
      createdAt
      updatedAt
      dayHourDayOfYear_iotNameThing
      __typename
    }
  }
`;
export const createPortionEvent = /* GraphQL */ `
  mutation CreatePortionEvent(
    $input: CreatePortionEventInput!
    $condition: ModelPortionEventConditionInput
  ) {
    createPortionEvent(input: $input, condition: $condition) {
      iotNameThing
      timestamp
      batchPortionID
      portionStatus
      portionWeight
      inventoryWeight
      batchPortionWeight
      batchPortionStatus
      LowerErrorLimit
      UpperErrorLimit
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
        portionEvent {
          nextToken
          __typename
        }
        createdAt
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
export const updatePortionEvent = /* GraphQL */ `
  mutation UpdatePortionEvent(
    $input: UpdatePortionEventInput!
    $condition: ModelPortionEventConditionInput
  ) {
    updatePortionEvent(input: $input, condition: $condition) {
      iotNameThing
      timestamp
      batchPortionID
      portionStatus
      portionWeight
      inventoryWeight
      batchPortionWeight
      batchPortionStatus
      LowerErrorLimit
      UpperErrorLimit
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
        portionEvent {
          nextToken
          __typename
        }
        createdAt
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
export const deletePortionEvent = /* GraphQL */ `
  mutation DeletePortionEvent(
    $input: DeletePortionEventInput!
    $condition: ModelPortionEventConditionInput
  ) {
    deletePortionEvent(input: $input, condition: $condition) {
      iotNameThing
      timestamp
      batchPortionID
      portionStatus
      portionWeight
      inventoryWeight
      batchPortionWeight
      batchPortionStatus
      LowerErrorLimit
      UpperErrorLimit
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
        portionEvent {
          nextToken
          __typename
        }
        createdAt
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
