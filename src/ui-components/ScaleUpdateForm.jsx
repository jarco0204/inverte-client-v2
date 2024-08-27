/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getScale } from "../graphql/queries";
import { updateScale } from "../graphql/mutations";
export default function ScaleUpdateForm(props) {
  const {
    scaleName: scaleNameProp,
    scale: scaleModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    scaleName: "",
    restaurant_id: "",
    restaurantName: "",
    ingredient: "",
    lastConnected: "",
    inventoryWeight: "",
  };
  const [scaleName, setScaleName] = React.useState(initialValues.scaleName);
  const [restaurant_id, setRestaurant_id] = React.useState(
    initialValues.restaurant_id
  );
  const [restaurantName, setRestaurantName] = React.useState(
    initialValues.restaurantName
  );
  const [ingredient, setIngredient] = React.useState(initialValues.ingredient);
  const [lastConnected, setLastConnected] = React.useState(
    initialValues.lastConnected
  );
  const [inventoryWeight, setInventoryWeight] = React.useState(
    initialValues.inventoryWeight
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = scaleRecord
      ? { ...initialValues, ...scaleRecord }
      : initialValues;
    setScaleName(cleanValues.scaleName);
    setRestaurant_id(cleanValues.restaurant_id);
    setRestaurantName(cleanValues.restaurantName);
    setIngredient(cleanValues.ingredient);
    setLastConnected(cleanValues.lastConnected);
    setInventoryWeight(cleanValues.inventoryWeight);
    setErrors({});
  };
  const [scaleRecord, setScaleRecord] = React.useState(scaleModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = scaleNameProp
        ? (
            await API.graphql({
              query: getScale.replaceAll("__typename", ""),
              variables: { scaleName: scaleNameProp },
            })
          )?.data?.getScale
        : scaleModelProp;
      setScaleRecord(record);
    };
    queryData();
  }, [scaleNameProp, scaleModelProp]);
  React.useEffect(resetStateValues, [scaleRecord]);
  const validations = {
    scaleName: [{ type: "Required" }],
    restaurant_id: [{ type: "Required" }],
    restaurantName: [],
    ingredient: [],
    lastConnected: [],
    inventoryWeight: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          scaleName,
          restaurant_id,
          restaurantName: restaurantName ?? null,
          ingredient: ingredient ?? null,
          lastConnected: lastConnected ?? null,
          inventoryWeight: inventoryWeight ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updateScale.replaceAll("__typename", ""),
            variables: {
              input: {
                scaleName: scaleRecord.scaleName,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ScaleUpdateForm")}
      {...rest}
    >
      <TextField
        label="Scale name"
        isRequired={true}
        isReadOnly={true}
        value={scaleName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              scaleName: value,
              restaurant_id,
              restaurantName,
              ingredient,
              lastConnected,
              inventoryWeight,
            };
            const result = onChange(modelFields);
            value = result?.scaleName ?? value;
          }
          if (errors.scaleName?.hasError) {
            runValidationTasks("scaleName", value);
          }
          setScaleName(value);
        }}
        onBlur={() => runValidationTasks("scaleName", scaleName)}
        errorMessage={errors.scaleName?.errorMessage}
        hasError={errors.scaleName?.hasError}
        {...getOverrideProps(overrides, "scaleName")}
      ></TextField>
      <TextField
        label="Restaurant id"
        isRequired={true}
        isReadOnly={false}
        value={restaurant_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              scaleName,
              restaurant_id: value,
              restaurantName,
              ingredient,
              lastConnected,
              inventoryWeight,
            };
            const result = onChange(modelFields);
            value = result?.restaurant_id ?? value;
          }
          if (errors.restaurant_id?.hasError) {
            runValidationTasks("restaurant_id", value);
          }
          setRestaurant_id(value);
        }}
        onBlur={() => runValidationTasks("restaurant_id", restaurant_id)}
        errorMessage={errors.restaurant_id?.errorMessage}
        hasError={errors.restaurant_id?.hasError}
        {...getOverrideProps(overrides, "restaurant_id")}
      ></TextField>
      <TextField
        label="Restaurant name"
        isRequired={false}
        isReadOnly={false}
        value={restaurantName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              scaleName,
              restaurant_id,
              restaurantName: value,
              ingredient,
              lastConnected,
              inventoryWeight,
            };
            const result = onChange(modelFields);
            value = result?.restaurantName ?? value;
          }
          if (errors.restaurantName?.hasError) {
            runValidationTasks("restaurantName", value);
          }
          setRestaurantName(value);
        }}
        onBlur={() => runValidationTasks("restaurantName", restaurantName)}
        errorMessage={errors.restaurantName?.errorMessage}
        hasError={errors.restaurantName?.hasError}
        {...getOverrideProps(overrides, "restaurantName")}
      ></TextField>
      <TextField
        label="Ingredient"
        isRequired={false}
        isReadOnly={false}
        value={ingredient}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              scaleName,
              restaurant_id,
              restaurantName,
              ingredient: value,
              lastConnected,
              inventoryWeight,
            };
            const result = onChange(modelFields);
            value = result?.ingredient ?? value;
          }
          if (errors.ingredient?.hasError) {
            runValidationTasks("ingredient", value);
          }
          setIngredient(value);
        }}
        onBlur={() => runValidationTasks("ingredient", ingredient)}
        errorMessage={errors.ingredient?.errorMessage}
        hasError={errors.ingredient?.hasError}
        {...getOverrideProps(overrides, "ingredient")}
      ></TextField>
      <TextField
        label="Last connected"
        isRequired={false}
        isReadOnly={false}
        value={lastConnected}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              scaleName,
              restaurant_id,
              restaurantName,
              ingredient,
              lastConnected: value,
              inventoryWeight,
            };
            const result = onChange(modelFields);
            value = result?.lastConnected ?? value;
          }
          if (errors.lastConnected?.hasError) {
            runValidationTasks("lastConnected", value);
          }
          setLastConnected(value);
        }}
        onBlur={() => runValidationTasks("lastConnected", lastConnected)}
        errorMessage={errors.lastConnected?.errorMessage}
        hasError={errors.lastConnected?.hasError}
        {...getOverrideProps(overrides, "lastConnected")}
      ></TextField>
      <TextField
        label="Inventory weight"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={inventoryWeight}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              scaleName,
              restaurant_id,
              restaurantName,
              ingredient,
              lastConnected,
              inventoryWeight: value,
            };
            const result = onChange(modelFields);
            value = result?.inventoryWeight ?? value;
          }
          if (errors.inventoryWeight?.hasError) {
            runValidationTasks("inventoryWeight", value);
          }
          setInventoryWeight(value);
        }}
        onBlur={() => runValidationTasks("inventoryWeight", inventoryWeight)}
        errorMessage={errors.inventoryWeight?.errorMessage}
        hasError={errors.inventoryWeight?.hasError}
        {...getOverrideProps(overrides, "inventoryWeight")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(scaleNameProp || scaleModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(scaleNameProp || scaleModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
