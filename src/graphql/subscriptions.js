/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateScale = /* GraphQL */ `
  subscription OnCreateScale($filter: ModelSubscriptionScaleFilterInput) {
    onCreateScale(filter: $filter) {
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
export const onUpdateScale = /* GraphQL */ `
  subscription OnUpdateScale($filter: ModelSubscriptionScaleFilterInput) {
    onUpdateScale(filter: $filter) {
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
export const onDeleteScale = /* GraphQL */ `
  subscription OnDeleteScale($filter: ModelSubscriptionScaleFilterInput) {
    onDeleteScale(filter: $filter) {
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
export const onCreateReadingTS = /* GraphQL */ `
  subscription OnCreateReadingTS(
    $filter: ModelSubscriptionReadingTSFilterInput
  ) {
    onCreateReadingTS(filter: $filter) {
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
export const onUpdateReadingTS = /* GraphQL */ `
  subscription OnUpdateReadingTS(
    $filter: ModelSubscriptionReadingTSFilterInput
  ) {
    onUpdateReadingTS(filter: $filter) {
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
export const onDeleteReadingTS = /* GraphQL */ `
  subscription OnDeleteReadingTS(
    $filter: ModelSubscriptionReadingTSFilterInput
  ) {
    onDeleteReadingTS(filter: $filter) {
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
export const onCreateReadingPE = /* GraphQL */ `
  subscription OnCreateReadingPE(
    $filter: ModelSubscriptionReadingPEFilterInput
  ) {
    onCreateReadingPE(filter: $filter) {
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
export const onUpdateReadingPE = /* GraphQL */ `
  subscription OnUpdateReadingPE(
    $filter: ModelSubscriptionReadingPEFilterInput
  ) {
    onUpdateReadingPE(filter: $filter) {
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
export const onDeleteReadingPE = /* GraphQL */ `
  subscription OnDeleteReadingPE(
    $filter: ModelSubscriptionReadingPEFilterInput
  ) {
    onDeleteReadingPE(filter: $filter) {
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
