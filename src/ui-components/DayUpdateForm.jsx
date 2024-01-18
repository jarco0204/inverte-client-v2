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
import { generateClient } from "aws-amplify/api";
import { getDay } from "../graphql/queries";
import { updateDay } from "../graphql/mutations";
const client = generateClient();
export default function DayUpdateForm(props) {
  const {
    dayOfYear_iotNameThing: dayOfYear_iotNameThingProp,
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
    dayOfYear_iotNameThing: "",
    weekOfYear_iotNameThing: "",
    monthOfYear_iotNameThing: "",
    year_iotNameThing: "",
    realTime: "",
    dashboardGraph: "",
    scaleActions: "",
    allPortionEvents: "",
    createdAt: "",
  };
  const [dayOfYear_iotNameThing, setDayOfYear_iotNameThing] = React.useState(
    initialValues.dayOfYear_iotNameThing
  );
  const [weekOfYear_iotNameThing, setWeekOfYear_iotNameThing] = React.useState(
    initialValues.weekOfYear_iotNameThing
  );
  const [monthOfYear_iotNameThing, setMonthOfYear_iotNameThing] =
    React.useState(initialValues.monthOfYear_iotNameThing);
  const [year_iotNameThing, setYear_iotNameThing] = React.useState(
    initialValues.year_iotNameThing
  );
  const [realTime, setRealTime] = React.useState(initialValues.realTime);
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
    setDayOfYear_iotNameThing(cleanValues.dayOfYear_iotNameThing);
    setWeekOfYear_iotNameThing(cleanValues.weekOfYear_iotNameThing);
    setMonthOfYear_iotNameThing(cleanValues.monthOfYear_iotNameThing);
    setYear_iotNameThing(cleanValues.year_iotNameThing);
    setRealTime(
      typeof cleanValues.realTime === "string" || cleanValues.realTime === null
        ? cleanValues.realTime
        : JSON.stringify(cleanValues.realTime)
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
      const record = dayOfYear_iotNameThingProp
        ? (
            await client.graphql({
              query: getDay.replaceAll("__typename", ""),
              variables: { dayOfYear_iotNameThing: dayOfYear_iotNameThingProp },
            })
          )?.data?.getDay
        : dayModelProp;
      setDayRecord(record);
    };
    queryData();
  }, [dayOfYear_iotNameThingProp, dayModelProp]);
  React.useEffect(resetStateValues, [dayRecord]);
  const validations = {
    dayOfYear_iotNameThing: [{ type: "Required" }],
    weekOfYear_iotNameThing: [{ type: "Required" }],
    monthOfYear_iotNameThing: [{ type: "Required" }],
    year_iotNameThing: [],
    realTime: [{ type: "JSON" }],
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
          dayOfYear_iotNameThing,
          weekOfYear_iotNameThing,
          monthOfYear_iotNameThing,
          year_iotNameThing: year_iotNameThing ?? null,
          realTime: realTime ?? null,
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
          await client.graphql({
            query: updateDay.replaceAll("__typename", ""),
            variables: {
              input: {
                dayOfYear_iotNameThing: dayRecord.dayOfYear_iotNameThing,
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
        label="Day of year iot name thing"
        isRequired={true}
        isReadOnly={true}
        value={dayOfYear_iotNameThing}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dayOfYear_iotNameThing: value,
              weekOfYear_iotNameThing,
              monthOfYear_iotNameThing,
              year_iotNameThing,
              realTime,
              dashboardGraph,
              scaleActions,
              allPortionEvents,
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
      <TextField
        label="Week of year iot name thing"
        isRequired={true}
        isReadOnly={false}
        value={weekOfYear_iotNameThing}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dayOfYear_iotNameThing,
              weekOfYear_iotNameThing: value,
              monthOfYear_iotNameThing,
              year_iotNameThing,
              realTime,
              dashboardGraph,
              scaleActions,
              allPortionEvents,
              createdAt,
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
              dayOfYear_iotNameThing,
              weekOfYear_iotNameThing,
              monthOfYear_iotNameThing: value,
              year_iotNameThing,
              realTime,
              dashboardGraph,
              scaleActions,
              allPortionEvents,
              createdAt,
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
        isRequired={false}
        isReadOnly={false}
        value={year_iotNameThing}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dayOfYear_iotNameThing,
              weekOfYear_iotNameThing,
              monthOfYear_iotNameThing,
              year_iotNameThing: value,
              realTime,
              dashboardGraph,
              scaleActions,
              allPortionEvents,
              createdAt,
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
        label="Real time"
        isRequired={false}
        isReadOnly={false}
        value={realTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dayOfYear_iotNameThing,
              weekOfYear_iotNameThing,
              monthOfYear_iotNameThing,
              year_iotNameThing,
              realTime: value,
              dashboardGraph,
              scaleActions,
              allPortionEvents,
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
        label="Dashboard graph"
        isRequired={false}
        isReadOnly={false}
        value={dashboardGraph}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dayOfYear_iotNameThing,
              weekOfYear_iotNameThing,
              monthOfYear_iotNameThing,
              year_iotNameThing,
              realTime,
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
              dayOfYear_iotNameThing,
              weekOfYear_iotNameThing,
              monthOfYear_iotNameThing,
              year_iotNameThing,
              realTime,
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
              dayOfYear_iotNameThing,
              weekOfYear_iotNameThing,
              monthOfYear_iotNameThing,
              year_iotNameThing,
              realTime,
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
              dayOfYear_iotNameThing,
              weekOfYear_iotNameThing,
              monthOfYear_iotNameThing,
              year_iotNameThing,
              realTime,
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
          isDisabled={!(dayOfYear_iotNameThingProp || dayModelProp)}
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
              !(dayOfYear_iotNameThingProp || dayModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
