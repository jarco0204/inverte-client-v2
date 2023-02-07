/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRestaurant = /* GraphQL */ `
  mutation CreateRestaurant(
    $input: CreateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    createRestaurant(input: $input, condition: $condition) {
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
export const updateRestaurant = /* GraphQL */ `
  mutation UpdateRestaurant(
    $input: UpdateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    updateRestaurant(input: $input, condition: $condition) {
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
export const deleteRestaurant = /* GraphQL */ `
  mutation DeleteRestaurant(
    $input: DeleteRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    deleteRestaurant(input: $input, condition: $condition) {
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
export const createScale = /* GraphQL */ `
  mutation CreateScale(
    $input: CreateScaleInput!
    $condition: ModelScaleConditionInput
  ) {
    createScale(input: $input, condition: $condition) {
      id
      iotName
      pubChannel
      subChannel
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
      iotName
      pubChannel
      subChannel
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
      iotName
      pubChannel
      subChannel
      createdAt
      updatedAt
    }
  }
`;
export const createInventory = /* GraphQL */ `
  mutation CreateInventory(
    $input: CreateInventoryInput!
    $condition: ModelInventoryConditionInput
  ) {
    createInventory(input: $input, condition: $condition) {
      name
      weight
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateInventory = /* GraphQL */ `
  mutation UpdateInventory(
    $input: UpdateInventoryInput!
    $condition: ModelInventoryConditionInput
  ) {
    updateInventory(input: $input, condition: $condition) {
      name
      weight
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteInventory = /* GraphQL */ `
  mutation DeleteInventory(
    $input: DeleteInventoryInput!
    $condition: ModelInventoryConditionInput
  ) {
    deleteInventory(input: $input, condition: $condition) {
      name
      weight
      id
      createdAt
      updatedAt
    }
  }
`;
export const createPortion = /* GraphQL */ `
  mutation CreatePortion(
    $input: CreatePortionInput!
    $condition: ModelPortionConditionInput
  ) {
    createPortion(input: $input, condition: $condition) {
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
export const updatePortion = /* GraphQL */ `
  mutation UpdatePortion(
    $input: UpdatePortionInput!
    $condition: ModelPortionConditionInput
  ) {
    updatePortion(input: $input, condition: $condition) {
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
export const deletePortion = /* GraphQL */ `
  mutation DeletePortion(
    $input: DeletePortionInput!
    $condition: ModelPortionConditionInput
  ) {
    deletePortion(input: $input, condition: $condition) {
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
