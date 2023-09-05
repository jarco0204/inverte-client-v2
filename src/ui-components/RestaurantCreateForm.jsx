/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { createRestaurant } from "../graphql/mutations";
export default function RestaurantCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    restaurant_id: "",
    demo: "",
    iotThingNames: "",
    restaurantLocationNum: "",
    displayIngredient: "",
    restaurantName: "",
    unitOfMass: "",
    timeZone: "",
  };
  const [restaurant_id, setRestaurant_id] = React.useState(
    initialValues.restaurant_id
  );
  const [demo, setDemo] = React.useState(initialValues.demo);
  const [iotThingNames, setIotThingNames] = React.useState(
    initialValues.iotThingNames
  );
  const [restaurantLocationNum, setRestaurantLocationNum] = React.useState(
    initialValues.restaurantLocationNum
  );
  const [displayIngredient, setDisplayIngredient] = React.useState(
    initialValues.displayIngredient
  );
  const [restaurantName, setRestaurantName] = React.useState(
    initialValues.restaurantName
  );
  const [unitOfMass, setUnitOfMass] = React.useState(initialValues.unitOfMass);
  const [timeZone, setTimeZone] = React.useState(initialValues.timeZone);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setRestaurant_id(initialValues.restaurant_id);
    setDemo(initialValues.demo);
    setIotThingNames(initialValues.iotThingNames);
    setRestaurantLocationNum(initialValues.restaurantLocationNum);
    setDisplayIngredient(initialValues.displayIngredient);
    setRestaurantName(initialValues.restaurantName);
    setUnitOfMass(initialValues.unitOfMass);
    setTimeZone(initialValues.timeZone);
    setErrors({});
  };
  const validations = {
    restaurant_id: [{ type: "Required" }],
    demo: [],
    iotThingNames: [{ type: "JSON" }],
    restaurantLocationNum: [],
    displayIngredient: [],
    restaurantName: [],
    unitOfMass: [],
    timeZone: [],
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
          restaurant_id,
          demo,
          iotThingNames,
          restaurantLocationNum,
          displayIngredient,
          restaurantName,
          unitOfMass,
          timeZone,
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
            query: createRestaurant,
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "RestaurantCreateForm")}
      {...rest}
    >
      <TextField
        label="Restaurant id"
        isRequired={true}
        isReadOnly={false}
        value={restaurant_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              restaurant_id: value,
              demo,
              iotThingNames,
              restaurantLocationNum,
              displayIngredient,
              restaurantName,
              unitOfMass,
              timeZone,
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
        label="Demo"
        isRequired={false}
        isReadOnly={false}
        value={demo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              restaurant_id,
              demo: value,
              iotThingNames,
              restaurantLocationNum,
              displayIngredient,
              restaurantName,
              unitOfMass,
              timeZone,
            };
            const result = onChange(modelFields);
            value = result?.demo ?? value;
          }
          if (errors.demo?.hasError) {
            runValidationTasks("demo", value);
          }
          setDemo(value);
        }}
        onBlur={() => runValidationTasks("demo", demo)}
        errorMessage={errors.demo?.errorMessage}
        hasError={errors.demo?.hasError}
        {...getOverrideProps(overrides, "demo")}
      ></TextField>
      <TextAreaField
        label="Iot thing names"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              restaurant_id,
              demo,
              iotThingNames: value,
              restaurantLocationNum,
              displayIngredient,
              restaurantName,
              unitOfMass,
              timeZone,
            };
            const result = onChange(modelFields);
            value = result?.iotThingNames ?? value;
          }
          if (errors.iotThingNames?.hasError) {
            runValidationTasks("iotThingNames", value);
          }
          setIotThingNames(value);
        }}
        onBlur={() => runValidationTasks("iotThingNames", iotThingNames)}
        errorMessage={errors.iotThingNames?.errorMessage}
        hasError={errors.iotThingNames?.hasError}
        {...getOverrideProps(overrides, "iotThingNames")}
      ></TextAreaField>
      <TextField
        label="Restaurant location num"
        isRequired={false}
        isReadOnly={false}
        value={restaurantLocationNum}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              restaurant_id,
              demo,
              iotThingNames,
              restaurantLocationNum: value,
              displayIngredient,
              restaurantName,
              unitOfMass,
              timeZone,
            };
            const result = onChange(modelFields);
            value = result?.restaurantLocationNum ?? value;
          }
          if (errors.restaurantLocationNum?.hasError) {
            runValidationTasks("restaurantLocationNum", value);
          }
          setRestaurantLocationNum(value);
        }}
        onBlur={() =>
          runValidationTasks("restaurantLocationNum", restaurantLocationNum)
        }
        errorMessage={errors.restaurantLocationNum?.errorMessage}
        hasError={errors.restaurantLocationNum?.hasError}
        {...getOverrideProps(overrides, "restaurantLocationNum")}
      ></TextField>
      <TextField
        label="Display ingredient"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={displayIngredient}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              restaurant_id,
              demo,
              iotThingNames,
              restaurantLocationNum,
              displayIngredient: value,
              restaurantName,
              unitOfMass,
              timeZone,
            };
            const result = onChange(modelFields);
            value = result?.displayIngredient ?? value;
          }
          if (errors.displayIngredient?.hasError) {
            runValidationTasks("displayIngredient", value);
          }
          setDisplayIngredient(value);
        }}
        onBlur={() =>
          runValidationTasks("displayIngredient", displayIngredient)
        }
        errorMessage={errors.displayIngredient?.errorMessage}
        hasError={errors.displayIngredient?.hasError}
        {...getOverrideProps(overrides, "displayIngredient")}
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
              restaurant_id,
              demo,
              iotThingNames,
              restaurantLocationNum,
              displayIngredient,
              restaurantName: value,
              unitOfMass,
              timeZone,
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
        label="Unit of mass"
        isRequired={false}
        isReadOnly={false}
        value={unitOfMass}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              restaurant_id,
              demo,
              iotThingNames,
              restaurantLocationNum,
              displayIngredient,
              restaurantName,
              unitOfMass: value,
              timeZone,
            };
            const result = onChange(modelFields);
            value = result?.unitOfMass ?? value;
          }
          if (errors.unitOfMass?.hasError) {
            runValidationTasks("unitOfMass", value);
          }
          setUnitOfMass(value);
        }}
        onBlur={() => runValidationTasks("unitOfMass", unitOfMass)}
        errorMessage={errors.unitOfMass?.errorMessage}
        hasError={errors.unitOfMass?.hasError}
        {...getOverrideProps(overrides, "unitOfMass")}
      ></TextField>
      <TextField
        label="Time zone"
        isRequired={false}
        isReadOnly={false}
        value={timeZone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              restaurant_id,
              demo,
              iotThingNames,
              restaurantLocationNum,
              displayIngredient,
              restaurantName,
              unitOfMass,
              timeZone: value,
            };
            const result = onChange(modelFields);
            value = result?.timeZone ?? value;
          }
          if (errors.timeZone?.hasError) {
            runValidationTasks("timeZone", value);
          }
          setTimeZone(value);
        }}
        onBlur={() => runValidationTasks("timeZone", timeZone)}
        errorMessage={errors.timeZone?.errorMessage}
        hasError={errors.timeZone?.hasError}
        {...getOverrideProps(overrides, "timeZone")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
