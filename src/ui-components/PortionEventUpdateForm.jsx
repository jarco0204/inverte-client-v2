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
import { getPortionEvent } from "../graphql/queries";
import { updatePortionEvent } from "../graphql/mutations";
export default function PortionEventUpdateForm(props) {
  const {
    timestamp: timestampProp,
    portionEvent: portionEventModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    iotNameThing: "",
    timestamp: "",
    batchPortionID: "",
    inventoryWeight: "",
    batchPortionWeightAR: "",
    batchPortionStatusAR: "",
    ingredientName: "",
    lowerErrorLimit: "",
    upperErrorLimit: "",
    correctWeight: "",
    portionTimeTaken: "",
  };
  const [iotNameThing, setIotNameThing] = React.useState(
    initialValues.iotNameThing
  );
  const [timestamp, setTimestamp] = React.useState(initialValues.timestamp);
  const [batchPortionID, setBatchPortionID] = React.useState(
    initialValues.batchPortionID
  );
  const [inventoryWeight, setInventoryWeight] = React.useState(
    initialValues.inventoryWeight
  );
  const [batchPortionWeightAR, setBatchPortionWeightAR] = React.useState(
    initialValues.batchPortionWeightAR
  );
  const [batchPortionStatusAR, setBatchPortionStatusAR] = React.useState(
    initialValues.batchPortionStatusAR
  );
  const [ingredientName, setIngredientName] = React.useState(
    initialValues.ingredientName
  );
  const [lowerErrorLimit, setLowerErrorLimit] = React.useState(
    initialValues.lowerErrorLimit
  );
  const [upperErrorLimit, setUpperErrorLimit] = React.useState(
    initialValues.upperErrorLimit
  );
  const [correctWeight, setCorrectWeight] = React.useState(
    initialValues.correctWeight
  );
  const [portionTimeTaken, setPortionTimeTaken] = React.useState(
    initialValues.portionTimeTaken
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = portionEventRecord
      ? { ...initialValues, ...portionEventRecord }
      : initialValues;
    setIotNameThing(cleanValues.iotNameThing);
    setTimestamp(cleanValues.timestamp);
    setBatchPortionID(cleanValues.batchPortionID);
    setInventoryWeight(cleanValues.inventoryWeight);
    setBatchPortionWeightAR(cleanValues.batchPortionWeightAR);
    setBatchPortionStatusAR(cleanValues.batchPortionStatusAR);
    setIngredientName(cleanValues.ingredientName);
    setLowerErrorLimit(cleanValues.lowerErrorLimit);
    setUpperErrorLimit(cleanValues.upperErrorLimit);
    setCorrectWeight(cleanValues.correctWeight);
    setPortionTimeTaken(cleanValues.portionTimeTaken);
    setErrors({});
  };
  const [portionEventRecord, setPortionEventRecord] = React.useState(
    portionEventModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = timestampProp
        ? (
            await API.graphql({
              query: getPortionEvent,
              variables: { timestamp: timestampProp },
            })
          )?.data?.getPortionEvent
        : portionEventModelProp;
      setPortionEventRecord(record);
    };
    queryData();
  }, [timestampProp, portionEventModelProp]);
  React.useEffect(resetStateValues, [portionEventRecord]);
  const validations = {
    iotNameThing: [],
    timestamp: [{ type: "Required" }],
    batchPortionID: [],
    inventoryWeight: [],
    batchPortionWeightAR: [],
    batchPortionStatusAR: [],
    ingredientName: [],
    lowerErrorLimit: [],
    upperErrorLimit: [],
    correctWeight: [],
    portionTimeTaken: [],
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
          iotNameThing: iotNameThing ?? null,
          timestamp,
          batchPortionID: batchPortionID ?? null,
          inventoryWeight: inventoryWeight ?? null,
          batchPortionWeightAR: batchPortionWeightAR ?? null,
          batchPortionStatusAR: batchPortionStatusAR ?? null,
          ingredientName: ingredientName ?? null,
          lowerErrorLimit: lowerErrorLimit ?? null,
          upperErrorLimit: upperErrorLimit ?? null,
          correctWeight: correctWeight ?? null,
          portionTimeTaken: portionTimeTaken ?? null,
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
            query: updatePortionEvent,
            variables: {
              input: {
                timestamp: portionEventRecord.timestamp,
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
      {...getOverrideProps(overrides, "PortionEventUpdateForm")}
      {...rest}
    >
      <TextField
        label="Iot name thing"
        isRequired={false}
        isReadOnly={false}
        value={iotNameThing}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              iotNameThing: value,
              timestamp,
              batchPortionID,
              inventoryWeight,
              batchPortionWeightAR,
              batchPortionStatusAR,
              ingredientName,
              lowerErrorLimit,
              upperErrorLimit,
              correctWeight,
              portionTimeTaken,
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
      <TextField
        label="Timestamp"
        isRequired={true}
        isReadOnly={true}
        value={timestamp}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              iotNameThing,
              timestamp: value,
              batchPortionID,
              inventoryWeight,
              batchPortionWeightAR,
              batchPortionStatusAR,
              ingredientName,
              lowerErrorLimit,
              upperErrorLimit,
              correctWeight,
              portionTimeTaken,
            };
            const result = onChange(modelFields);
            value = result?.timestamp ?? value;
          }
          if (errors.timestamp?.hasError) {
            runValidationTasks("timestamp", value);
          }
          setTimestamp(value);
        }}
        onBlur={() => runValidationTasks("timestamp", timestamp)}
        errorMessage={errors.timestamp?.errorMessage}
        hasError={errors.timestamp?.hasError}
        {...getOverrideProps(overrides, "timestamp")}
      ></TextField>
      <TextField
        label="Batch portion id"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={batchPortionID}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              iotNameThing,
              timestamp,
              batchPortionID: value,
              inventoryWeight,
              batchPortionWeightAR,
              batchPortionStatusAR,
              ingredientName,
              lowerErrorLimit,
              upperErrorLimit,
              correctWeight,
              portionTimeTaken,
            };
            const result = onChange(modelFields);
            value = result?.batchPortionID ?? value;
          }
          if (errors.batchPortionID?.hasError) {
            runValidationTasks("batchPortionID", value);
          }
          setBatchPortionID(value);
        }}
        onBlur={() => runValidationTasks("batchPortionID", batchPortionID)}
        errorMessage={errors.batchPortionID?.errorMessage}
        hasError={errors.batchPortionID?.hasError}
        {...getOverrideProps(overrides, "batchPortionID")}
      ></TextField>
      <TextField
        label="Inventory weight"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={inventoryWeight}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              iotNameThing,
              timestamp,
              batchPortionID,
              inventoryWeight: value,
              batchPortionWeightAR,
              batchPortionStatusAR,
              ingredientName,
              lowerErrorLimit,
              upperErrorLimit,
              correctWeight,
              portionTimeTaken,
            };
            const result = onChange(modelFields);
            value = result?.inventoryWeight ?? value;
          }
          if (errors.inventoryWeight?.hasError) {
            runValidationTasks("inventoryWeight", value);
          }
          setInventoryWeight(value);
        }}
        onBlur={() => runValidationTasks("inventoryWeight", inventoryWeight)}
        errorMessage={errors.inventoryWeight?.errorMessage}
        hasError={errors.inventoryWeight?.hasError}
        {...getOverrideProps(overrides, "inventoryWeight")}
      ></TextField>
      <TextField
        label="Batch portion weight ar"
        isRequired={false}
        isReadOnly={false}
        value={batchPortionWeightAR}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              iotNameThing,
              timestamp,
              batchPortionID,
              inventoryWeight,
              batchPortionWeightAR: value,
              batchPortionStatusAR,
              ingredientName,
              lowerErrorLimit,
              upperErrorLimit,
              correctWeight,
              portionTimeTaken,
            };
            const result = onChange(modelFields);
            value = result?.batchPortionWeightAR ?? value;
          }
          if (errors.batchPortionWeightAR?.hasError) {
            runValidationTasks("batchPortionWeightAR", value);
          }
          setBatchPortionWeightAR(value);
        }}
        onBlur={() =>
          runValidationTasks("batchPortionWeightAR", batchPortionWeightAR)
        }
        errorMessage={errors.batchPortionWeightAR?.errorMessage}
        hasError={errors.batchPortionWeightAR?.hasError}
        {...getOverrideProps(overrides, "batchPortionWeightAR")}
      ></TextField>
      <TextField
        label="Batch portion status ar"
        isRequired={false}
        isReadOnly={false}
        value={batchPortionStatusAR}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              iotNameThing,
              timestamp,
              batchPortionID,
              inventoryWeight,
              batchPortionWeightAR,
              batchPortionStatusAR: value,
              ingredientName,
              lowerErrorLimit,
              upperErrorLimit,
              correctWeight,
              portionTimeTaken,
            };
            const result = onChange(modelFields);
            value = result?.batchPortionStatusAR ?? value;
          }
          if (errors.batchPortionStatusAR?.hasError) {
            runValidationTasks("batchPortionStatusAR", value);
          }
          setBatchPortionStatusAR(value);
        }}
        onBlur={() =>
          runValidationTasks("batchPortionStatusAR", batchPortionStatusAR)
        }
        errorMessage={errors.batchPortionStatusAR?.errorMessage}
        hasError={errors.batchPortionStatusAR?.hasError}
        {...getOverrideProps(overrides, "batchPortionStatusAR")}
      ></TextField>
      <TextField
        label="Ingredient name"
        isRequired={false}
        isReadOnly={false}
        value={ingredientName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              iotNameThing,
              timestamp,
              batchPortionID,
              inventoryWeight,
              batchPortionWeightAR,
              batchPortionStatusAR,
              ingredientName: value,
              lowerErrorLimit,
              upperErrorLimit,
              correctWeight,
              portionTimeTaken,
            };
            const result = onChange(modelFields);
            value = result?.ingredientName ?? value;
          }
          if (errors.ingredientName?.hasError) {
            runValidationTasks("ingredientName", value);
          }
          setIngredientName(value);
        }}
        onBlur={() => runValidationTasks("ingredientName", ingredientName)}
        errorMessage={errors.ingredientName?.errorMessage}
        hasError={errors.ingredientName?.hasError}
        {...getOverrideProps(overrides, "ingredientName")}
      ></TextField>
      <TextField
        label="Lower error limit"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={lowerErrorLimit}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              iotNameThing,
              timestamp,
              batchPortionID,
              inventoryWeight,
              batchPortionWeightAR,
              batchPortionStatusAR,
              ingredientName,
              lowerErrorLimit: value,
              upperErrorLimit,
              correctWeight,
              portionTimeTaken,
            };
            const result = onChange(modelFields);
            value = result?.lowerErrorLimit ?? value;
          }
          if (errors.lowerErrorLimit?.hasError) {
            runValidationTasks("lowerErrorLimit", value);
          }
          setLowerErrorLimit(value);
        }}
        onBlur={() => runValidationTasks("lowerErrorLimit", lowerErrorLimit)}
        errorMessage={errors.lowerErrorLimit?.errorMessage}
        hasError={errors.lowerErrorLimit?.hasError}
        {...getOverrideProps(overrides, "lowerErrorLimit")}
      ></TextField>
      <TextField
        label="Upper error limit"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={upperErrorLimit}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              iotNameThing,
              timestamp,
              batchPortionID,
              inventoryWeight,
              batchPortionWeightAR,
              batchPortionStatusAR,
              ingredientName,
              lowerErrorLimit,
              upperErrorLimit: value,
              correctWeight,
              portionTimeTaken,
            };
            const result = onChange(modelFields);
            value = result?.upperErrorLimit ?? value;
          }
          if (errors.upperErrorLimit?.hasError) {
            runValidationTasks("upperErrorLimit", value);
          }
          setUpperErrorLimit(value);
        }}
        onBlur={() => runValidationTasks("upperErrorLimit", upperErrorLimit)}
        errorMessage={errors.upperErrorLimit?.errorMessage}
        hasError={errors.upperErrorLimit?.hasError}
        {...getOverrideProps(overrides, "upperErrorLimit")}
      ></TextField>
      <TextField
        label="Correct weight"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={correctWeight}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              iotNameThing,
              timestamp,
              batchPortionID,
              inventoryWeight,
              batchPortionWeightAR,
              batchPortionStatusAR,
              ingredientName,
              lowerErrorLimit,
              upperErrorLimit,
              correctWeight: value,
              portionTimeTaken,
            };
            const result = onChange(modelFields);
            value = result?.correctWeight ?? value;
          }
          if (errors.correctWeight?.hasError) {
            runValidationTasks("correctWeight", value);
          }
          setCorrectWeight(value);
        }}
        onBlur={() => runValidationTasks("correctWeight", correctWeight)}
        errorMessage={errors.correctWeight?.errorMessage}
        hasError={errors.correctWeight?.hasError}
        {...getOverrideProps(overrides, "correctWeight")}
      ></TextField>
      <TextField
        label="Portion time taken"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={portionTimeTaken}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              iotNameThing,
              timestamp,
              batchPortionID,
              inventoryWeight,
              batchPortionWeightAR,
              batchPortionStatusAR,
              ingredientName,
              lowerErrorLimit,
              upperErrorLimit,
              correctWeight,
              portionTimeTaken: value,
            };
            const result = onChange(modelFields);
            value = result?.portionTimeTaken ?? value;
          }
          if (errors.portionTimeTaken?.hasError) {
            runValidationTasks("portionTimeTaken", value);
          }
          setPortionTimeTaken(value);
        }}
        onBlur={() => runValidationTasks("portionTimeTaken", portionTimeTaken)}
        errorMessage={errors.portionTimeTaken?.errorMessage}
        hasError={errors.portionTimeTaken?.hasError}
        {...getOverrideProps(overrides, "portionTimeTaken")}
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
          isDisabled={!(timestampProp || portionEventModelProp)}
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
              !(timestampProp || portionEventModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
