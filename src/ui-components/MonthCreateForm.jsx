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
import { createMonth } from "../graphql/mutations";
export default function MonthCreateForm(props) {
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
    monthOfYear_iotNameThing: "",
    year_iotNameThing: "",
    scaleActions: "",
  };
  const [monthOfYear_iotNameThing, setMonthOfYear_iotNameThing] =
    React.useState(initialValues.monthOfYear_iotNameThing);
  const [year_iotNameThing, setYear_iotNameThing] = React.useState(
    initialValues.year_iotNameThing
  );
  const [scaleActions, setScaleActions] = React.useState(
    initialValues.scaleActions
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setMonthOfYear_iotNameThing(initialValues.monthOfYear_iotNameThing);
    setYear_iotNameThing(initialValues.year_iotNameThing);
    setScaleActions(initialValues.scaleActions);
    setErrors({});
  };
  const validations = {
    monthOfYear_iotNameThing: [{ type: "Required" }],
    year_iotNameThing: [{ type: "Required" }],
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
          monthOfYear_iotNameThing,
          year_iotNameThing,
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
            query: createMonth.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "MonthCreateForm")}
      {...rest}
    >
      <TextField
        label="Month of year iot name thing"
        isRequired={true}
        isReadOnly={false}
        value={monthOfYear_iotNameThing}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              monthOfYear_iotNameThing: value,
              year_iotNameThing,
              scaleActions,
            };
            const result = onChange(modelFields);
            value = result?.monthOfYear_iotNameThing ?? value;
          }
          if (errors.monthOfYear_iotNameThing?.hasError) {
            runValidationTasks("monthOfYear_iotNameThing", value);
          }
          setMonthOfYear_iotNameThing(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "monthOfYear_iotNameThing",
            monthOfYear_iotNameThing
          )
        }
        errorMessage={errors.monthOfYear_iotNameThing?.errorMessage}
        hasError={errors.monthOfYear_iotNameThing?.hasError}
        {...getOverrideProps(overrides, "monthOfYear_iotNameThing")}
      ></TextField>
      <TextField
        label="Year iot name thing"
        isRequired={true}
        isReadOnly={false}
        value={year_iotNameThing}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              monthOfYear_iotNameThing,
              year_iotNameThing: value,
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
      <TextAreaField
        label="Scale actions"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              monthOfYear_iotNameThing,
              year_iotNameThing,
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
