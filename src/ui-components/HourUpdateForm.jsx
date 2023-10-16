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
import { getHour } from "../graphql/queries";
import { updateHour } from "../graphql/mutations";
export default function HourUpdateForm(props) {
  const {
    dayOfYear_hourOfDay_iotNameThing: dayOfYear_hourOfDay_iotNameThingProp,
    hour: hourModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    dayOfYear_hourOfDay_iotNameThing: "",
    dayOfYear_iotNameThing: "",
    realTime: "",
    scaleActions: "",
    createdAt: "",
  };
  const [
    dayOfYear_hourOfDay_iotNameThing,
    setDayOfYear_hourOfDay_iotNameThing,
  ] = React.useState(initialValues.dayOfYear_hourOfDay_iotNameThing);
  const [dayOfYear_iotNameThing, setDayOfYear_iotNameThing] = React.useState(
    initialValues.dayOfYear_iotNameThing
  );
  const [realTime, setRealTime] = React.useState(initialValues.realTime);
  const [scaleActions, setScaleActions] = React.useState(
    initialValues.scaleActions
  );
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = hourRecord
      ? { ...initialValues, ...hourRecord }
      : initialValues;
    setDayOfYear_hourOfDay_iotNameThing(
      cleanValues.dayOfYear_hourOfDay_iotNameThing
    );
    setDayOfYear_iotNameThing(cleanValues.dayOfYear_iotNameThing);
    setRealTime(
      typeof cleanValues.realTime === "string" || cleanValues.realTime === null
        ? cleanValues.realTime
        : JSON.stringify(cleanValues.realTime)
    );
    setScaleActions(
      typeof cleanValues.scaleActions === "string" ||
        cleanValues.scaleActions === null
        ? cleanValues.scaleActions
        : JSON.stringify(cleanValues.scaleActions)
    );
    setCreatedAt(cleanValues.createdAt);
    setErrors({});
  };
  const [hourRecord, setHourRecord] = React.useState(hourModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = dayOfYear_hourOfDay_iotNameThingProp
        ? (
            await API.graphql({
              query: getHour,
              variables: {
                dayOfYear_hourOfDay_iotNameThing:
                  dayOfYear_hourOfDay_iotNameThingProp,
              },
            })
          )?.data?.getHour
        : hourModelProp;
      setHourRecord(record);
    };
    queryData();
  }, [dayOfYear_hourOfDay_iotNameThingProp, hourModelProp]);
  React.useEffect(resetStateValues, [hourRecord]);
  const validations = {
    dayOfYear_hourOfDay_iotNameThing: [{ type: "Required" }],
    dayOfYear_iotNameThing: [{ type: "Required" }],
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
          dayOfYear_hourOfDay_iotNameThing,
          dayOfYear_iotNameThing,
          realTime,
          scaleActions: scaleActions ?? null,
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
            query: updateHour,
            variables: {
              input: {
                dayOfYear_hourOfDay_iotNameThing:
                  hourRecord.dayOfYear_hourOfDay_iotNameThing,
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
      {...getOverrideProps(overrides, "HourUpdateForm")}
      {...rest}
    >
      <TextField
        label="Day of year hour of day iot name thing"
        isRequired={true}
        isReadOnly={true}
        value={dayOfYear_hourOfDay_iotNameThing}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dayOfYear_hourOfDay_iotNameThing: value,
              dayOfYear_iotNameThing,
              realTime,
              scaleActions,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.dayOfYear_hourOfDay_iotNameThing ?? value;
          }
          if (errors.dayOfYear_hourOfDay_iotNameThing?.hasError) {
            runValidationTasks("dayOfYear_hourOfDay_iotNameThing", value);
          }
          setDayOfYear_hourOfDay_iotNameThing(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "dayOfYear_hourOfDay_iotNameThing",
            dayOfYear_hourOfDay_iotNameThing
          )
        }
        errorMessage={errors.dayOfYear_hourOfDay_iotNameThing?.errorMessage}
        hasError={errors.dayOfYear_hourOfDay_iotNameThing?.hasError}
        {...getOverrideProps(overrides, "dayOfYear_hourOfDay_iotNameThing")}
      ></TextField>
      <TextField
        label="Day of year iot name thing"
        isRequired={true}
        isReadOnly={false}
        value={dayOfYear_iotNameThing}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dayOfYear_hourOfDay_iotNameThing,
              dayOfYear_iotNameThing: value,
              realTime,
              scaleActions,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.dayOfYear_iotNameThing ?? value;
          }
          if (errors.dayOfYear_iotNameThing?.hasError) {
            runValidationTasks("dayOfYear_iotNameThing", value);
          }
          setDayOfYear_iotNameThing(value);
        }}
        onBlur={() =>
          runValidationTasks("dayOfYear_iotNameThing", dayOfYear_iotNameThing)
        }
        errorMessage={errors.dayOfYear_iotNameThing?.errorMessage}
        hasError={errors.dayOfYear_iotNameThing?.hasError}
        {...getOverrideProps(overrides, "dayOfYear_iotNameThing")}
      ></TextField>
      <TextAreaField
        label="Real time"
        isRequired={true}
        isReadOnly={false}
        value={realTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dayOfYear_hourOfDay_iotNameThing,
              dayOfYear_iotNameThing,
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
        value={scaleActions}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dayOfYear_hourOfDay_iotNameThing,
              dayOfYear_iotNameThing,
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
              dayOfYear_hourOfDay_iotNameThing,
              dayOfYear_iotNameThing,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(dayOfYear_hourOfDay_iotNameThingProp || hourModelProp)}
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
              !(dayOfYear_hourOfDay_iotNameThingProp || hourModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
