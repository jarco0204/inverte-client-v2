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
import { getDay } from "../../amplify/backend/gql/queries";
import { updateDay } from "../../amplify/backend/gql/mutations";
export default function DayUpdateForm(props) {
  const {
    year_dayOfYear_iotNameThing_ingredientName:
      year_dayOfYear_iotNameThing_ingredientNameProp,
    day: dayModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    year_dayOfYear_iotNameThing_ingredientName: "",
    weekOfYear_iotNameThing_ingredientName: "",
    monthOfYear_iotNameThing_ingredientName: "",
    year_iotNameThing_ingredientName: "",
    dashboardGraph: "",
    scaleActions: "",
    allPortionEvents: "",
    createdAt: "",
  };
  const [
    year_dayOfYear_iotNameThing_ingredientName,
    setYear_dayOfYear_iotNameThing_ingredientName,
  ] = React.useState(initialValues.year_dayOfYear_iotNameThing_ingredientName);
  const [
    weekOfYear_iotNameThing_ingredientName,
    setWeekOfYear_iotNameThing_ingredientName,
  ] = React.useState(initialValues.weekOfYear_iotNameThing_ingredientName);
  const [
    monthOfYear_iotNameThing_ingredientName,
    setMonthOfYear_iotNameThing_ingredientName,
  ] = React.useState(initialValues.monthOfYear_iotNameThing_ingredientName);
  const [
    year_iotNameThing_ingredientName,
    setYear_iotNameThing_ingredientName,
  ] = React.useState(initialValues.year_iotNameThing_ingredientName);
  const [dashboardGraph, setDashboardGraph] = React.useState(
    initialValues.dashboardGraph
  );
  const [scaleActions, setScaleActions] = React.useState(
    initialValues.scaleActions
  );
  const [allPortionEvents, setAllPortionEvents] = React.useState(
    initialValues.allPortionEvents
  );
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = dayRecord
      ? { ...initialValues, ...dayRecord }
      : initialValues;
    setYear_dayOfYear_iotNameThing_ingredientName(
      cleanValues.year_dayOfYear_iotNameThing_ingredientName
    );
    setWeekOfYear_iotNameThing_ingredientName(
      cleanValues.weekOfYear_iotNameThing_ingredientName
    );
    setMonthOfYear_iotNameThing_ingredientName(
      cleanValues.monthOfYear_iotNameThing_ingredientName
    );
    setYear_iotNameThing_ingredientName(
      cleanValues.year_iotNameThing_ingredientName
    );
    setDashboardGraph(
      typeof cleanValues.dashboardGraph === "string" ||
        cleanValues.dashboardGraph === null
        ? cleanValues.dashboardGraph
        : JSON.stringify(cleanValues.dashboardGraph)
    );
    setScaleActions(
      typeof cleanValues.scaleActions === "string" ||
        cleanValues.scaleActions === null
        ? cleanValues.scaleActions
        : JSON.stringify(cleanValues.scaleActions)
    );
    setAllPortionEvents(
      typeof cleanValues.allPortionEvents === "string" ||
        cleanValues.allPortionEvents === null
        ? cleanValues.allPortionEvents
        : JSON.stringify(cleanValues.allPortionEvents)
    );
    setCreatedAt(cleanValues.createdAt);
    setErrors({});
  };
  const [dayRecord, setDayRecord] = React.useState(dayModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = year_dayOfYear_iotNameThing_ingredientNameProp
        ? (
            await API.graphql({
              query: getDay.replaceAll("__typename", ""),
              variables: {
                year_dayOfYear_iotNameThing_ingredientName:
                  year_dayOfYear_iotNameThing_ingredientNameProp,
              },
            })
          )?.data?.getDay
        : dayModelProp;
      setDayRecord(record);
    };
    queryData();
  }, [year_dayOfYear_iotNameThing_ingredientNameProp, dayModelProp]);
  React.useEffect(resetStateValues, [dayRecord]);
  const validations = {
    year_dayOfYear_iotNameThing_ingredientName: [{ type: "Required" }],
    weekOfYear_iotNameThing_ingredientName: [{ type: "Required" }],
    monthOfYear_iotNameThing_ingredientName: [{ type: "Required" }],
    year_iotNameThing_ingredientName: [{ type: "Required" }],
    dashboardGraph: [{ type: "JSON" }],
    scaleActions: [{ type: "JSON" }],
    allPortionEvents: [{ type: "JSON" }],
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
          year_dayOfYear_iotNameThing_ingredientName,
          weekOfYear_iotNameThing_ingredientName,
          monthOfYear_iotNameThing_ingredientName,
          year_iotNameThing_ingredientName,
          dashboardGraph: dashboardGraph ?? null,
          scaleActions: scaleActions ?? null,
          allPortionEvents: allPortionEvents ?? null,
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
            query: updateDay.replaceAll("__typename", ""),
            variables: {
              input: {
                year_dayOfYear_iotNameThing_ingredientName:
                  dayRecord.year_dayOfYear_iotNameThing_ingredientName,
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
      {...getOverrideProps(overrides, "DayUpdateForm")}
      {...rest}
    >
      <TextField
        label="Year day of year iot name thing ingredient name"
        isRequired={true}
        isReadOnly={true}
        value={year_dayOfYear_iotNameThing_ingredientName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              year_dayOfYear_iotNameThing_ingredientName: value,
              weekOfYear_iotNameThing_ingredientName,
              monthOfYear_iotNameThing_ingredientName,
              year_iotNameThing_ingredientName,
              dashboardGraph,
              scaleActions,
              allPortionEvents,
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
      <TextField
        label="Week of year iot name thing ingredient name"
        isRequired={true}
        isReadOnly={false}
        value={weekOfYear_iotNameThing_ingredientName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              year_dayOfYear_iotNameThing_ingredientName,
              weekOfYear_iotNameThing_ingredientName: value,
              monthOfYear_iotNameThing_ingredientName,
              year_iotNameThing_ingredientName,
              dashboardGraph,
              scaleActions,
              allPortionEvents,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.weekOfYear_iotNameThing_ingredientName ?? value;
          }
          if (errors.weekOfYear_iotNameThing_ingredientName?.hasError) {
            runValidationTasks("weekOfYear_iotNameThing_ingredientName", value);
          }
          setWeekOfYear_iotNameThing_ingredientName(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "weekOfYear_iotNameThing_ingredientName",
            weekOfYear_iotNameThing_ingredientName
          )
        }
        errorMessage={
          errors.weekOfYear_iotNameThing_ingredientName?.errorMessage
        }
        hasError={errors.weekOfYear_iotNameThing_ingredientName?.hasError}
        {...getOverrideProps(
          overrides,
          "weekOfYear_iotNameThing_ingredientName"
        )}
      ></TextField>
      <TextField
        label="Month of year iot name thing ingredient name"
        isRequired={true}
        isReadOnly={false}
        value={monthOfYear_iotNameThing_ingredientName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              year_dayOfYear_iotNameThing_ingredientName,
              weekOfYear_iotNameThing_ingredientName,
              monthOfYear_iotNameThing_ingredientName: value,
              year_iotNameThing_ingredientName,
              dashboardGraph,
              scaleActions,
              allPortionEvents,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.monthOfYear_iotNameThing_ingredientName ?? value;
          }
          if (errors.monthOfYear_iotNameThing_ingredientName?.hasError) {
            runValidationTasks(
              "monthOfYear_iotNameThing_ingredientName",
              value
            );
          }
          setMonthOfYear_iotNameThing_ingredientName(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "monthOfYear_iotNameThing_ingredientName",
            monthOfYear_iotNameThing_ingredientName
          )
        }
        errorMessage={
          errors.monthOfYear_iotNameThing_ingredientName?.errorMessage
        }
        hasError={errors.monthOfYear_iotNameThing_ingredientName?.hasError}
        {...getOverrideProps(
          overrides,
          "monthOfYear_iotNameThing_ingredientName"
        )}
      ></TextField>
      <TextField
        label="Year iot name thing ingredient name"
        isRequired={true}
        isReadOnly={false}
        value={year_iotNameThing_ingredientName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              year_dayOfYear_iotNameThing_ingredientName,
              weekOfYear_iotNameThing_ingredientName,
              monthOfYear_iotNameThing_ingredientName,
              year_iotNameThing_ingredientName: value,
              dashboardGraph,
              scaleActions,
              allPortionEvents,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.year_iotNameThing_ingredientName ?? value;
          }
          if (errors.year_iotNameThing_ingredientName?.hasError) {
            runValidationTasks("year_iotNameThing_ingredientName", value);
          }
          setYear_iotNameThing_ingredientName(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "year_iotNameThing_ingredientName",
            year_iotNameThing_ingredientName
          )
        }
        errorMessage={errors.year_iotNameThing_ingredientName?.errorMessage}
        hasError={errors.year_iotNameThing_ingredientName?.hasError}
        {...getOverrideProps(overrides, "year_iotNameThing_ingredientName")}
      ></TextField>
      <TextAreaField
        label="Dashboard graph"
        isRequired={false}
        isReadOnly={false}
        value={dashboardGraph}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              year_dayOfYear_iotNameThing_ingredientName,
              weekOfYear_iotNameThing_ingredientName,
              monthOfYear_iotNameThing_ingredientName,
              year_iotNameThing_ingredientName,
              dashboardGraph: value,
              scaleActions,
              allPortionEvents,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.dashboardGraph ?? value;
          }
          if (errors.dashboardGraph?.hasError) {
            runValidationTasks("dashboardGraph", value);
          }
          setDashboardGraph(value);
        }}
        onBlur={() => runValidationTasks("dashboardGraph", dashboardGraph)}
        errorMessage={errors.dashboardGraph?.errorMessage}
        hasError={errors.dashboardGraph?.hasError}
        {...getOverrideProps(overrides, "dashboardGraph")}
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
              year_dayOfYear_iotNameThing_ingredientName,
              weekOfYear_iotNameThing_ingredientName,
              monthOfYear_iotNameThing_ingredientName,
              year_iotNameThing_ingredientName,
              dashboardGraph,
              scaleActions: value,
              allPortionEvents,
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
      <TextAreaField
        label="All portion events"
        isRequired={false}
        isReadOnly={false}
        value={allPortionEvents}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              year_dayOfYear_iotNameThing_ingredientName,
              weekOfYear_iotNameThing_ingredientName,
              monthOfYear_iotNameThing_ingredientName,
              year_iotNameThing_ingredientName,
              dashboardGraph,
              scaleActions,
              allPortionEvents: value,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.allPortionEvents ?? value;
          }
          if (errors.allPortionEvents?.hasError) {
            runValidationTasks("allPortionEvents", value);
          }
          setAllPortionEvents(value);
        }}
        onBlur={() => runValidationTasks("allPortionEvents", allPortionEvents)}
        errorMessage={errors.allPortionEvents?.errorMessage}
        hasError={errors.allPortionEvents?.hasError}
        {...getOverrideProps(overrides, "allPortionEvents")}
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
              year_dayOfYear_iotNameThing_ingredientName,
              weekOfYear_iotNameThing_ingredientName,
              monthOfYear_iotNameThing_ingredientName,
              year_iotNameThing_ingredientName,
              dashboardGraph,
              scaleActions,
              allPortionEvents,
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
          isDisabled={
            !(year_dayOfYear_iotNameThing_ingredientNameProp || dayModelProp)
          }
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
              !(
                year_dayOfYear_iotNameThing_ingredientNameProp || dayModelProp
              ) || Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
