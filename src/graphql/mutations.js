/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createScale = /* GraphQL */ `
  mutation CreateScale(
    $input: CreateScaleInput!
    $condition: ModelScaleConditionInput
  ) {
    createScale(input: $input, condition: $condition) {
      id
      deviceID
      restaurantID
      ingredientName
      correctWeight
      upperLimit
      lowerLimit
      tsReadings {
        items {
          deviceID
          timestamp
          readingID
          temp
          humidity
          inventoryWeight
          id
          createdAt
          updatedAt
          scaleTsReadingsId
        }
        nextToken
      }
      peReadings {
        items {
          deviceID
          timestamp
          readingID
          portionWeight
          inventoryWeight
          id
          createdAt
          updatedAt
          scalePeReadingsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateScale = /* GraphQL */ `
  mutation UpdateScale(
    $input: UpdateScaleInput!
    $condition: ModelScaleConditionInput
  ) {
    updateScale(input: $input, condition: $condition) {
      id
      deviceID
      restaurantID
      ingredientName
      correctWeight
      upperLimit
      lowerLimit
      tsReadings {
        items {
          deviceID
          timestamp
          readingID
          temp
          humidity
          inventoryWeight
          id
          createdAt
          updatedAt
          scaleTsReadingsId
        }
        nextToken
      }
      peReadings {
        items {
          deviceID
          timestamp
          readingID
          portionWeight
          inventoryWeight
          id
          createdAt
          updatedAt
          scalePeReadingsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteScale = /* GraphQL */ `
  mutation DeleteScale(
    $input: DeleteScaleInput!
    $condition: ModelScaleConditionInput
  ) {
    deleteScale(input: $input, condition: $condition) {
      id
      deviceID
      restaurantID
      ingredientName
      correctWeight
      upperLimit
      lowerLimit
      tsReadings {
        items {
          deviceID
          timestamp
          readingID
          temp
          humidity
          inventoryWeight
          id
          createdAt
          updatedAt
          scaleTsReadingsId
        }
        nextToken
      }
      peReadings {
        items {
          deviceID
          timestamp
          readingID
          portionWeight
          inventoryWeight
          id
          createdAt
          updatedAt
          scalePeReadingsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createReadingTS = /* GraphQL */ `
  mutation CreateReadingTS(
    $input: CreateReadingTSInput!
    $condition: ModelReadingTSConditionInput
  ) {
    createReadingTS(input: $input, condition: $condition) {
      deviceID
      timestamp
      readingID
      temp
      humidity
      inventoryWeight
      id
      createdAt
      updatedAt
      scaleTsReadingsId
    }
  }
`;
export const updateReadingTS = /* GraphQL */ `
  mutation UpdateReadingTS(
    $input: UpdateReadingTSInput!
    $condition: ModelReadingTSConditionInput
  ) {
    updateReadingTS(input: $input, condition: $condition) {
      deviceID
      timestamp
      readingID
      temp
      humidity
      inventoryWeight
      id
      createdAt
      updatedAt
      scaleTsReadingsId
    }
  }
`;
export const deleteReadingTS = /* GraphQL */ `
  mutation DeleteReadingTS(
    $input: DeleteReadingTSInput!
    $condition: ModelReadingTSConditionInput
  ) {
    deleteReadingTS(input: $input, condition: $condition) {
      deviceID
      timestamp
      readingID
      temp
      humidity
      inventoryWeight
      id
      createdAt
      updatedAt
      scaleTsReadingsId
    }
  }
`;
export const createReadingPE = /* GraphQL */ `
  mutation CreateReadingPE(
    $input: CreateReadingPEInput!
    $condition: ModelReadingPEConditionInput
  ) {
    createReadingPE(input: $input, condition: $condition) {
      deviceID
      timestamp
      readingID
      portionWeight
      inventoryWeight
      id
      createdAt
      updatedAt
      scalePeReadingsId
    }
  }
`;
export const updateReadingPE = /* GraphQL */ `
  mutation UpdateReadingPE(
    $input: UpdateReadingPEInput!
    $condition: ModelReadingPEConditionInput
  ) {
    updateReadingPE(input: $input, condition: $condition) {
      deviceID
      timestamp
      readingID
      portionWeight
      inventoryWeight
      id
      createdAt
      updatedAt
      scalePeReadingsId
    }
  }
`;
export const deleteReadingPE = /* GraphQL */ `
  mutation DeleteReadingPE(
    $input: DeleteReadingPEInput!
    $condition: ModelReadingPEConditionInput
  ) {
    deleteReadingPE(input: $input, condition: $condition) {
      deviceID
      timestamp
      readingID
      portionWeight
      inventoryWeight
      id
      createdAt
      updatedAt
      scalePeReadingsId
    }
  }
`;
