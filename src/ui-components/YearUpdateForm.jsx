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
import { getYear } from "../graphql/queries";
import { updateYear } from "../graphql/mutations";
export default function YearUpdateForm(props) {
  const {
    year_iotNameThing: year_iotNameThingProp,
    year: yearModelProp,
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
    realTime: "",
    scaleActions: "",
  };
  const [year_iotNameThing, setYear_iotNameThing] = React.useState(
    initialValues.year_iotNameThing
  );
  const [ingredientName_weight, setIngredientName_weight] = React.useState(
    initialValues.ingredientName_weight
  );
  const [realTime, setRealTime] = React.useState(initialValues.realTime);
  const [scaleActions, setScaleActions] = React.useState(
    initialValues.scaleActions
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = yearRecord
      ? { ...initialValues, ...yearRecord }
      : initialValues;
    setYear_iotNameThing(cleanValues.year_iotNameThing);
    setIngredientName_weight(cleanValues.ingredientName_weight);
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
    setErrors({});
  };
  const [yearRecord, setYearRecord] = React.useState(yearModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = year_iotNameThingProp
        ? (
            await API.graphql({
              query: getYear,
              variables: { year_iotNameThing: year_iotNameThingProp },
            })
          )?.data?.getYear
        : yearModelProp;
      setYearRecord(record);
    };
    queryData();
  }, [year_iotNameThingProp, yearModelProp]);
  React.useEffect(resetStateValues, [yearRecord]);
  const validations = {
    year_iotNameThing: [{ type: "Required" }],
    ingredientName_weight: [{ type: "Required" }],
    realTime: [{ type: "JSON" }],
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
          realTime: realTime ?? null,
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
            query: updateYear,
            variables: {
              input: {
                year_iotNameThing: yearRecord.year_iotNameThing,
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
      {...getOverrideProps(overrides, "YearUpdateForm")}
      {...rest}
    >
      <TextField
        label="Year iot name thing"
        isRequired={true}
        isReadOnly={true}
        value={year_iotNameThing}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              year_iotNameThing: value,
              ingredientName_weight,
              realTime,
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
              realTime,
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
      <TextAreaField
        label="Real time"
        isRequired={false}
        isReadOnly={false}
        value={realTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              year_iotNameThing,
              ingredientName_weight,
              realTime: value,
              scaleActions,
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
              year_iotNameThing,
              ingredientName_weight,
              realTime,
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
          isDisabled={!(year_iotNameThingProp || yearModelProp)}
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
              !(year_iotNameThingProp || yearModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
