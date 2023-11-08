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
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createYear } from "../graphql/mutations";
export default function YearCreateForm(props) {
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
    year_iotNameThing: "",
    ingredientName_weight: "",
    lastConnected: "",
    scaleActions: "",
  };
  const [year_iotNameThing, setYear_iotNameThing] = React.useState(
    initialValues.year_iotNameThing
  );
  const [ingredientName_weight, setIngredientName_weight] = React.useState(
    initialValues.ingredientName_weight
  );
  const [lastConnected, setLastConnected] = React.useState(
    initialValues.lastConnected
  );
  const [scaleActions, setScaleActions] = React.useState(
    initialValues.scaleActions
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setYear_iotNameThing(initialValues.year_iotNameThing);
    setIngredientName_weight(initialValues.ingredientName_weight);
    setLastConnected(initialValues.lastConnected);
    setScaleActions(initialValues.scaleActions);
    setErrors({});
  };
  const validations = {
    year_iotNameThing: [{ type: "Required" }],
    ingredientName_weight: [{ type: "Required" }],
    lastConnected: [],
    scaleActions: [{ type: "JSON" }],
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
          year_iotNameThing,
          ingredientName_weight,
          lastConnected,
          scaleActions,
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
            query: createYear.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "YearCreateForm")}
      {...rest}
    >
      <TextField
        label="Year iot name thing"
        isRequired={true}
        isReadOnly={false}
        value={year_iotNameThing}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              year_iotNameThing: value,
              ingredientName_weight,
              lastConnected,
              scaleActions,
            };
            const result = onChange(modelFields);
            value = result?.year_iotNameThing ?? value;
          }
          if (errors.year_iotNameThing?.hasError) {
            runValidationTasks("year_iotNameThing", value);
          }
          setYear_iotNameThing(value);
        }}
        onBlur={() =>
          runValidationTasks("year_iotNameThing", year_iotNameThing)
        }
        errorMessage={errors.year_iotNameThing?.errorMessage}
        hasError={errors.year_iotNameThing?.hasError}
        {...getOverrideProps(overrides, "year_iotNameThing")}
      ></TextField>
      <TextField
        label="Ingredient name weight"
        isRequired={true}
        isReadOnly={false}
        value={ingredientName_weight}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              year_iotNameThing,
              ingredientName_weight: value,
              lastConnected,
              scaleActions,
            };
            const result = onChange(modelFields);
            value = result?.ingredientName_weight ?? value;
          }
          if (errors.ingredientName_weight?.hasError) {
            runValidationTasks("ingredientName_weight", value);
          }
          setIngredientName_weight(value);
        }}
        onBlur={() =>
          runValidationTasks("ingredientName_weight", ingredientName_weight)
        }
        errorMessage={errors.ingredientName_weight?.errorMessage}
        hasError={errors.ingredientName_weight?.hasError}
        {...getOverrideProps(overrides, "ingredientName_weight")}
      ></TextField>
      <TextField
        label="Last connected"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={lastConnected}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              year_iotNameThing,
              ingredientName_weight,
              lastConnected: value,
              scaleActions,
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
      <TextAreaField
        label="Scale actions"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              year_iotNameThing,
              ingredientName_weight,
              lastConnected,
              scaleActions: value,
            };
            const result = onChange(modelFields);
            value = result?.scaleActions ?? value;
          }
          if (errors.scaleActions?.hasError) {
            runValidationTasks("scaleActions", value);
          }
          setScaleActions(value);
        }}
        onBlur={() => runValidationTasks("scaleActions", scaleActions)}
        errorMessage={errors.scaleActions?.errorMessage}
        hasError={errors.scaleActions?.hasError}
        {...getOverrideProps(overrides, "scaleActions")}
      ></TextAreaField>
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
