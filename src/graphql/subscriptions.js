/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRestaurant = /* GraphQL */ `
  subscription OnCreateRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
  ) {
    onCreateRestaurant(filter: $filter) {
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
export const onUpdateRestaurant = /* GraphQL */ `
  subscription OnUpdateRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
  ) {
    onUpdateRestaurant(filter: $filter) {
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
export const onDeleteRestaurant = /* GraphQL */ `
  subscription OnDeleteRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
  ) {
    onDeleteRestaurant(filter: $filter) {
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
export const onCreateScale = /* GraphQL */ `
  subscription OnCreateScale($filter: ModelSubscriptionScaleFilterInput) {
    onCreateScale(filter: $filter) {
      id
      iotName
      pubChannel
      subChannel
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateScale = /* GraphQL */ `
  subscription OnUpdateScale($filter: ModelSubscriptionScaleFilterInput) {
    onUpdateScale(filter: $filter) {
      id
      iotName
      pubChannel
      subChannel
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteScale = /* GraphQL */ `
  subscription OnDeleteScale($filter: ModelSubscriptionScaleFilterInput) {
    onDeleteScale(filter: $filter) {
      id
      iotName
      pubChannel
      subChannel
      createdAt
      updatedAt
    }
  }
`;
export const onCreateInventory = /* GraphQL */ `
  subscription OnCreateInventory(
    $filter: ModelSubscriptionInventoryFilterInput
  ) {
    onCreateInventory(filter: $filter) {
      name
      weight
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateInventory = /* GraphQL */ `
  subscription OnUpdateInventory(
    $filter: ModelSubscriptionInventoryFilterInput
  ) {
    onUpdateInventory(filter: $filter) {
      name
      weight
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteInventory = /* GraphQL */ `
  subscription OnDeleteInventory(
    $filter: ModelSubscriptionInventoryFilterInput
  ) {
    onDeleteInventory(filter: $filter) {
      name
      weight
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePortion = /* GraphQL */ `
  subscription OnCreatePortion($filter: ModelSubscriptionPortionFilterInput) {
    onCreatePortion(filter: $filter) {
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
export const onUpdatePortion = /* GraphQL */ `
  subscription OnUpdatePortion($filter: ModelSubscriptionPortionFilterInput) {
    onUpdatePortion(filter: $filter) {
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
export const onDeletePortion = /* GraphQL */ `
  subscription OnDeletePortion($filter: ModelSubscriptionPortionFilterInput) {
    onDeletePortion(filter: $filter) {
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
