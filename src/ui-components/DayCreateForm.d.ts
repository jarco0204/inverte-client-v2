/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DayCreateFormInputValues = {
    dayOfYear_iotNameThing?: string;
    weekOfYear_iotNameThing?: string;
    monthOfYear_iotNameThing?: string;
    year_iotNameThing?: string;
    dashboardGraph?: string;
    scaleActions?: string;
    allPortionEvents?: string;
    createdAt?: string;
};
export declare type DayCreateFormValidationValues = {
    dayOfYear_iotNameThing?: ValidationFunction<string>;
    weekOfYear_iotNameThing?: ValidationFunction<string>;
    monthOfYear_iotNameThing?: ValidationFunction<string>;
    year_iotNameThing?: ValidationFunction<string>;
    dashboardGraph?: ValidationFunction<string>;
    scaleActions?: ValidationFunction<string>;
    allPortionEvents?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DayCreateFormOverridesProps = {
    DayCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    dayOfYear_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    weekOfYear_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    monthOfYear_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    year_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    dashboardGraph?: PrimitiveOverrideProps<TextAreaFieldProps>;
    scaleActions?: PrimitiveOverrideProps<TextAreaFieldProps>;
    allPortionEvents?: PrimitiveOverrideProps<TextAreaFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DayCreateFormProps = React.PropsWithChildren<{
    overrides?: DayCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DayCreateFormInputValues) => DayCreateFormInputValues;
    onSuccess?: (fields: DayCreateFormInputValues) => void;
    onError?: (fields: DayCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DayCreateFormInputValues) => DayCreateFormInputValues;
    onValidate?: DayCreateFormValidationValues;
} & React.CSSProperties>;
export default function DayCreateForm(props: DayCreateFormProps): React.ReactElement;
