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
import { getWeek } from "../graphql/queries";
import { updateWeek } from "../graphql/mutations";
export default function WeekUpdateForm(props) {
  const {
    weekOfYear_iotNameThing: weekOfYear_iotNameThingProp,
    week: weekModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    weekOfYear_iotNameThing: "",
    monthOfYear_iotNameThing: "",
    scaleActions: "",
  };
  const [weekOfYear_iotNameThing, setWeekOfYear_iotNameThing] = React.useState(
    initialValues.weekOfYear_iotNameThing
  );
  const [monthOfYear_iotNameThing, setMonthOfYear_iotNameThing] =
    React.useState(initialValues.monthOfYear_iotNameThing);
  const [scaleActions, setScaleActions] = React.useState(
    initialValues.scaleActions
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = weekRecord
      ? { ...initialValues, ...weekRecord }
      : initialValues;
    setWeekOfYear_iotNameThing(cleanValues.weekOfYear_iotNameThing);
    setMonthOfYear_iotNameThing(cleanValues.monthOfYear_iotNameThing);
    setScaleActions(
      typeof cleanValues.scaleActions === "string" ||
        cleanValues.scaleActions === null
        ? cleanValues.scaleActions
        : JSON.stringify(cleanValues.scaleActions)
    );
    setErrors({});
  };
  const [weekRecord, setWeekRecord] = React.useState(weekModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = weekOfYear_iotNameThingProp
        ? (
            await API.graphql({
              query: getWeek,
              variables: {
                weekOfYear_iotNameThing: weekOfYear_iotNameThingProp,
              },
            })
          )?.data?.getWeek
        : weekModelProp;
      setWeekRecord(record);
    };
    queryData();
  }, [weekOfYear_iotNameThingProp, weekModelProp]);
  React.useEffect(resetStateValues, [weekRecord]);
  const validations = {
    weekOfYear_iotNameThing: [{ type: "Required" }],
    monthOfYear_iotNameThing: [{ type: "Required" }],
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
          weekOfYear_iotNameThing,
          monthOfYear_iotNameThing,
          scaleActions: scaleActions ?? null,
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
            query: updateWeek,
            variables: {
              input: {
                weekOfYear_iotNameThing: weekRecord.weekOfYear_iotNameThing,
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
      {...getOverrideProps(overrides, "WeekUpdateForm")}
      {...rest}
    >
      <TextField
        label="Week of year iot name thing"
        isRequired={true}
        isReadOnly={true}
        value={weekOfYear_iotNameThing}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              weekOfYear_iotNameThing: value,
              monthOfYear_iotNameThing,
              scaleActions,
            };
            const result = onChange(modelFields);
            value = result?.weekOfYear_iotNameThing ?? value;
          }
          if (errors.weekOfYear_iotNameThing?.hasError) {
            runValidationTasks("weekOfYear_iotNameThing", value);
          }
          setWeekOfYear_iotNameThing(value);
        }}
        onBlur={() =>
          runValidationTasks("weekOfYear_iotNameThing", weekOfYear_iotNameThing)
        }
        errorMessage={errors.weekOfYear_iotNameThing?.errorMessage}
        hasError={errors.weekOfYear_iotNameThing?.hasError}
        {...getOverrideProps(overrides, "weekOfYear_iotNameThing")}
      ></TextField>
      <TextField
        label="Month of year iot name thing"
        isRequired={true}
        isReadOnly={false}
        value={monthOfYear_iotNameThing}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              weekOfYear_iotNameThing,
              monthOfYear_iotNameThing: value,
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
      <TextAreaField
        label="Scale actions"
        isRequired={false}
        isReadOnly={false}
        value={scaleActions}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              weekOfYear_iotNameThing,
              monthOfYear_iotNameThing,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(weekOfYear_iotNameThingProp || weekModelProp)}
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
              !(weekOfYear_iotNameThingProp || weekModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
