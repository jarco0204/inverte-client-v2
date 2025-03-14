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
import { createHour } from "../graphql/mutations";
export default function HourCreateForm(props) {
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
    year_dayOfYear_hourOfDay_iotNameThing_ingredientName: "",
    year_dayOfYear_iotNameThing_ingredientName: "",
    realTime: "",
    scaleActions: "",
    createdAt: "",
  };
  const [
    year_dayOfYear_hourOfDay_iotNameThing_ingredientName,
    setYear_dayOfYear_hourOfDay_iotNameThing_ingredientName,
  ] = React.useState(
    initialValues.year_dayOfYear_hourOfDay_iotNameThing_ingredientName
  );
  const [
    year_dayOfYear_iotNameThing_ingredientName,
    setYear_dayOfYear_iotNameThing_ingredientName,
  ] = React.useState(initialValues.year_dayOfYear_iotNameThing_ingredientName);
  const [realTime, setRealTime] = React.useState(initialValues.realTime);
  const [scaleActions, setScaleActions] = React.useState(
    initialValues.scaleActions
  );
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setYear_dayOfYear_hourOfDay_iotNameThing_ingredientName(
      initialValues.year_dayOfYear_hourOfDay_iotNameThing_ingredientName
    );
    setYear_dayOfYear_iotNameThing_ingredientName(
      initialValues.year_dayOfYear_iotNameThing_ingredientName
    );
    setRealTime(initialValues.realTime);
    setScaleActions(initialValues.scaleActions);
    setCreatedAt(initialValues.createdAt);
    setErrors({});
  };
  const validations = {
    year_dayOfYear_hourOfDay_iotNameThing_ingredientName: [
      { type: "Required" },
    ],
    year_dayOfYear_iotNameThing_ingredientName: [{ type: "Required" }],
    realTime: [{ type: "Required" }, { type: "JSON" }],
    scaleActions: [{ type: "JSON" }],
    createdAt: [{ type: "Required" }],
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
          year_dayOfYear_hourOfDay_iotNameThing_ingredientName,
          year_dayOfYear_iotNameThing_ingredientName,
          realTime,
          scaleActions,
          createdAt,
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
            query: createHour.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "HourCreateForm")}
      {...rest}
    >
      <TextField
        label="Year day of year hour of day iot name thing ingredient name"
        isRequired={true}
        isReadOnly={false}
        value={year_dayOfYear_hourOfDay_iotNameThing_ingredientName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              year_dayOfYear_hourOfDay_iotNameThing_ingredientName: value,
              year_dayOfYear_iotNameThing_ingredientName,
              realTime,
              scaleActions,
              createdAt,
            };
            const result = onChange(modelFields);
            value =
              result?.year_dayOfYear_hourOfDay_iotNameThing_ingredientName ??
              value;
          }
          if (
            errors.year_dayOfYear_hourOfDay_iotNameThing_ingredientName
              ?.hasError
          ) {
            runValidationTasks(
              "year_dayOfYear_hourOfDay_iotNameThing_ingredientName",
              value
            );
          }
          setYear_dayOfYear_hourOfDay_iotNameThing_ingredientName(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "year_dayOfYear_hourOfDay_iotNameThing_ingredientName",
            year_dayOfYear_hourOfDay_iotNameThing_ingredientName
          )
        }
        errorMessage={
          errors.year_dayOfYear_hourOfDay_iotNameThing_ingredientName
            ?.errorMessage
        }
        hasError={
          errors.year_dayOfYear_hourOfDay_iotNameThing_ingredientName?.hasError
        }
        {...getOverrideProps(
          overrides,
          "year_dayOfYear_hourOfDay_iotNameThing_ingredientName"
        )}
      ></TextField>
      <TextField
        label="Year day of year iot name thing ingredient name"
        isRequired={true}
        isReadOnly={false}
        value={year_dayOfYear_iotNameThing_ingredientName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              year_dayOfYear_hourOfDay_iotNameThing_ingredientName,
              year_dayOfYear_iotNameThing_ingredientName: value,
              realTime,
              scaleActions,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.year_dayOfYear_iotNameThing_ingredientName ?? value;
          }
          if (errors.year_dayOfYear_iotNameThing_ingredientName?.hasError) {
            runValidationTasks(
              "year_dayOfYear_iotNameThing_ingredientName",
              value
            );
          }
          setYear_dayOfYear_iotNameThing_ingredientName(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "year_dayOfYear_iotNameThing_ingredientName",
            year_dayOfYear_iotNameThing_ingredientName
          )
        }
        errorMessage={
          errors.year_dayOfYear_iotNameThing_ingredientName?.errorMessage
        }
        hasError={errors.year_dayOfYear_iotNameThing_ingredientName?.hasError}
        {...getOverrideProps(
          overrides,
          "year_dayOfYear_iotNameThing_ingredientName"
        )}
      ></TextField>
      <TextAreaField
        label="Real time"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              year_dayOfYear_hourOfDay_iotNameThing_ingredientName,
              year_dayOfYear_iotNameThing_ingredientName,
              realTime: value,
              scaleActions,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.realTime ?? value;
          }
          if (errors.realTime?.hasError) {
            runValidationTasks("realTime", value);
          }
          setRealTime(value);
        }}
        onBlur={() => runValidationTasks("realTime", realTime)}
        errorMessage={errors.realTime?.errorMessage}
        hasError={errors.realTime?.hasError}
        {...getOverrideProps(overrides, "realTime")}
      ></TextAreaField>
      <TextAreaField
        label="Scale actions"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              year_dayOfYear_hourOfDay_iotNameThing_ingredientName,
              year_dayOfYear_iotNameThing_ingredientName,
              realTime,
              scaleActions: value,
              createdAt,
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
      <TextField
        label="Created at"
        isRequired={true}
        isReadOnly={false}
        value={createdAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              year_dayOfYear_hourOfDay_iotNameThing_ingredientName,
              year_dayOfYear_iotNameThing_ingredientName,
              realTime,
              scaleActions,
              createdAt: value,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
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
