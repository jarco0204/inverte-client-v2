/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { createIngredient } from "../graphql/mutations";
export default function IngredientCreateForm(props) {
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
    ingredient_name: "",
    iotNameThing: "",
  };
  const [ingredient_name, setIngredient_name] = React.useState(
    initialValues.ingredient_name
  );
  const [iotNameThing, setIotNameThing] = React.useState(
    initialValues.iotNameThing
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setIngredient_name(initialValues.ingredient_name);
    setIotNameThing(initialValues.iotNameThing);
    setErrors({});
  };
  const validations = {
    ingredient_name: [{ type: "Required" }],
    iotNameThing: [{ type: "Required" }],
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
          ingredient_name,
          iotNameThing,
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
            query: createIngredient.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "IngredientCreateForm")}
      {...rest}
    >
      <TextField
        label="Ingredient name"
        isRequired={true}
        isReadOnly={false}
        value={ingredient_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ingredient_name: value,
              iotNameThing,
            };
            const result = onChange(modelFields);
            value = result?.ingredient_name ?? value;
          }
          if (errors.ingredient_name?.hasError) {
            runValidationTasks("ingredient_name", value);
          }
          setIngredient_name(value);
        }}
        onBlur={() => runValidationTasks("ingredient_name", ingredient_name)}
        errorMessage={errors.ingredient_name?.errorMessage}
        hasError={errors.ingredient_name?.hasError}
        {...getOverrideProps(overrides, "ingredient_name")}
      ></TextField>
      <TextField
        label="Iot name thing"
        isRequired={true}
        isReadOnly={false}
        value={iotNameThing}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ingredient_name,
              iotNameThing: value,
            };
            const result = onChange(modelFields);
            value = result?.iotNameThing ?? value;
          }
          if (errors.iotNameThing?.hasError) {
            runValidationTasks("iotNameThing", value);
          }
          setIotNameThing(value);
        }}
        onBlur={() => runValidationTasks("iotNameThing", iotNameThing)}
        errorMessage={errors.iotNameThing?.errorMessage}
        hasError={errors.iotNameThing?.hasError}
        {...getOverrideProps(overrides, "iotNameThing")}
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
