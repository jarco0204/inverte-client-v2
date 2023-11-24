/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getScale } from "../graphql/queries";
import { updateScale } from "../graphql/mutations";
const client = generateClient();
export default function ScaleUpdateForm(props) {
  const {
    iotNameThing: iotNameThingProp,
    scale: scaleModelProp,
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
    restaurant_id: "",
    unitOfMass: "",
    multiplier: "",
    firmwareVersion: "",
  };
  const [iotNameThing, setIotNameThing] = React.useState(
    initialValues.iotNameThing
  );
  const [restaurant_id, setRestaurant_id] = React.useState(
    initialValues.restaurant_id
  );
  const [unitOfMass, setUnitOfMass] = React.useState(initialValues.unitOfMass);
  const [multiplier, setMultiplier] = React.useState(initialValues.multiplier);
  const [firmwareVersion, setFirmwareVersion] = React.useState(
    initialValues.firmwareVersion
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = scaleRecord
      ? { ...initialValues, ...scaleRecord }
      : initialValues;
    setIotNameThing(cleanValues.iotNameThing);
    setRestaurant_id(cleanValues.restaurant_id);
    setUnitOfMass(cleanValues.unitOfMass);
    setMultiplier(cleanValues.multiplier);
    setFirmwareVersion(cleanValues.firmwareVersion);
    setErrors({});
  };
  const [scaleRecord, setScaleRecord] = React.useState(scaleModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = iotNameThingProp
        ? (
            await client.graphql({
              query: getScale.replaceAll("__typename", ""),
              variables: { iotNameThing: iotNameThingProp },
            })
          )?.data?.getScale
        : scaleModelProp;
      setScaleRecord(record);
    };
    queryData();
  }, [iotNameThingProp, scaleModelProp]);
  React.useEffect(resetStateValues, [scaleRecord]);
  const validations = {
    iotNameThing: [{ type: "Required" }],
    restaurant_id: [{ type: "Required" }],
    unitOfMass: [{ type: "Required" }],
    multiplier: [{ type: "Required" }],
    firmwareVersion: [],
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
          iotNameThing,
          restaurant_id,
          unitOfMass,
          multiplier,
          firmwareVersion: firmwareVersion ?? null,
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
            query: updateScale.replaceAll("__typename", ""),
            variables: {
              input: {
                iotNameThing: scaleRecord.iotNameThing,
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
      {...getOverrideProps(overrides, "ScaleUpdateForm")}
      {...rest}
    >
      <TextField
        label="Iot name thing"
        isRequired={true}
        isReadOnly={true}
        value={iotNameThing}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              iotNameThing: value,
              restaurant_id,
              unitOfMass,
              multiplier,
              firmwareVersion,
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
        label="Restaurant id"
        isRequired={true}
        isReadOnly={false}
        value={restaurant_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              iotNameThing,
              restaurant_id: value,
              unitOfMass,
              multiplier,
              firmwareVersion,
            };
            const result = onChange(modelFields);
            value = result?.restaurant_id ?? value;
          }
          if (errors.restaurant_id?.hasError) {
            runValidationTasks("restaurant_id", value);
          }
          setRestaurant_id(value);
        }}
        onBlur={() => runValidationTasks("restaurant_id", restaurant_id)}
        errorMessage={errors.restaurant_id?.errorMessage}
        hasError={errors.restaurant_id?.hasError}
        {...getOverrideProps(overrides, "restaurant_id")}
      ></TextField>
      <TextField
        label="Unit of mass"
        isRequired={true}
        isReadOnly={false}
        value={unitOfMass}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              iotNameThing,
              restaurant_id,
              unitOfMass: value,
              multiplier,
              firmwareVersion,
            };
            const result = onChange(modelFields);
            value = result?.unitOfMass ?? value;
          }
          if (errors.unitOfMass?.hasError) {
            runValidationTasks("unitOfMass", value);
          }
          setUnitOfMass(value);
        }}
        onBlur={() => runValidationTasks("unitOfMass", unitOfMass)}
        errorMessage={errors.unitOfMass?.errorMessage}
        hasError={errors.unitOfMass?.hasError}
        {...getOverrideProps(overrides, "unitOfMass")}
      ></TextField>
      <TextField
        label="Multiplier"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={multiplier}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              iotNameThing,
              restaurant_id,
              unitOfMass,
              multiplier: value,
              firmwareVersion,
            };
            const result = onChange(modelFields);
            value = result?.multiplier ?? value;
          }
          if (errors.multiplier?.hasError) {
            runValidationTasks("multiplier", value);
          }
          setMultiplier(value);
        }}
        onBlur={() => runValidationTasks("multiplier", multiplier)}
        errorMessage={errors.multiplier?.errorMessage}
        hasError={errors.multiplier?.hasError}
        {...getOverrideProps(overrides, "multiplier")}
      ></TextField>
      <TextField
        label="Firmware version"
        isRequired={false}
        isReadOnly={false}
        value={firmwareVersion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              iotNameThing,
              restaurant_id,
              unitOfMass,
              multiplier,
              firmwareVersion: value,
            };
            const result = onChange(modelFields);
            value = result?.firmwareVersion ?? value;
          }
          if (errors.firmwareVersion?.hasError) {
            runValidationTasks("firmwareVersion", value);
          }
          setFirmwareVersion(value);
        }}
        onBlur={() => runValidationTasks("firmwareVersion", firmwareVersion)}
        errorMessage={errors.firmwareVersion?.errorMessage}
        hasError={errors.firmwareVersion?.hasError}
        {...getOverrideProps(overrides, "firmwareVersion")}
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
          isDisabled={!(iotNameThingProp || scaleModelProp)}
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
              !(iotNameThingProp || scaleModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
