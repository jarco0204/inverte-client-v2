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
import { getIngredient } from "../graphql/queries";
import { updateIngredient } from "../graphql/mutations";
export default function IngredientUpdateForm(props) {
  const {
    ingredient_name: ingredient_nameProp,
    ingredient: ingredientModelProp,
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
    const cleanValues = ingredientRecord
      ? { ...initialValues, ...ingredientRecord }
      : initialValues;
    setIngredient_name(cleanValues.ingredient_name);
    setIotNameThing(cleanValues.iotNameThing);
    setErrors({});
  };
  const [ingredientRecord, setIngredientRecord] =
    React.useState(ingredientModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = ingredient_nameProp
        ? (
            await API.graphql({
              query: getIngredient,
              variables: { ingredient_name: ingredient_nameProp },
            })
          )?.data?.getIngredient
        : ingredientModelProp;
      setIngredientRecord(record);
    };
    queryData();
  }, [ingredient_nameProp, ingredientModelProp]);
  React.useEffect(resetStateValues, [ingredientRecord]);
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
            query: updateIngredient,
            variables: {
              input: {
                ingredient_name: ingredientRecord.ingredient_name,
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
      {...getOverrideProps(overrides, "IngredientUpdateForm")}
      {...rest}
    >
      <TextField
        label="Ingredient name"
        isRequired={true}
        isReadOnly={true}
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(ingredient_nameProp || ingredientModelProp)}
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
              !(ingredient_nameProp || ingredientModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
