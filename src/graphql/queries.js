/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getScale = /* GraphQL */ `
  query GetScale($id: ID!) {
    getScale(id: $id) {
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
export const listScales = /* GraphQL */ `
  query ListScales(
    $filter: ModelScaleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScales(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        deviceID
        restaurantID
        ingredientName
        correctWeight
        upperLimit
        lowerLimit
        tsReadings {
          nextToken
        }
        peReadings {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReadingTS = /* GraphQL */ `
  query GetReadingTS($id: ID!) {
    getReadingTS(id: $id) {
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
export const listReadingTS = /* GraphQL */ `
  query ListReadingTS(
    $filter: ModelReadingTSFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReadingTS(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getReadingPE = /* GraphQL */ `
  query GetReadingPE($id: ID!) {
    getReadingPE(id: $id) {
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
export const listReadingPES = /* GraphQL */ `
  query ListReadingPES(
    $filter: ModelReadingPEFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReadingPES(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
