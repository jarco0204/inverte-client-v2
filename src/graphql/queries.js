/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRestaurant = /* GraphQL */ `
  query GetRestaurant($id: ID!) {
    getRestaurant(id: $id) {
      id
      name
      location
      locationNum
      numberOfScales
      phoneNumber
      createdAt
      updatedAt
    }
  }
`;
export const listRestaurants = /* GraphQL */ `
  query ListRestaurants(
    $filter: ModelRestaurantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestaurants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        location
        locationNum
        numberOfScales
        phoneNumber
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getScale = /* GraphQL */ `
  query GetScale($id: ID!) {
    getScale(id: $id) {
      id
      iotName
      pubChannel
      subChannel
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
        iotName
        pubChannel
        subChannel
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getInventory = /* GraphQL */ `
  query GetInventory($id: ID!) {
    getInventory(id: $id) {
      name
      weight
      id
      createdAt
      updatedAt
    }
  }
`;
export const listInventories = /* GraphQL */ `
  query ListInventories(
    $filter: ModelInventoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInventories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
        weight
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPortion = /* GraphQL */ `
  query GetPortion($id: ID!) {
    getPortion(id: $id) {
      correctWeight
      upperLimit
      lowerLimit
      weightPortion
      id
      createdAt
      updatedAt
    }
  }
`;
export const listPortions = /* GraphQL */ `
  query ListPortions(
    $filter: ModelPortionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPortions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        correctWeight
        upperLimit
        lowerLimit
        weightPortion
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
