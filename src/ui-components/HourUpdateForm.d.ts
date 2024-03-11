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
export declare type HourUpdateFormInputValues = {
    year_dayOfYear_hourOfDay_iotNameThing_ingredientName?: string;
    year_dayOfYear_iotNameThing_ingredientName?: string;
    realTime?: string;
    scaleActions?: string;
    createdAt?: string;
};
export declare type HourUpdateFormValidationValues = {
    year_dayOfYear_hourOfDay_iotNameThing_ingredientName?: ValidationFunction<string>;
    year_dayOfYear_iotNameThing_ingredientName?: ValidationFunction<string>;
    realTime?: ValidationFunction<string>;
    scaleActions?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HourUpdateFormOverridesProps = {
    HourUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    year_dayOfYear_hourOfDay_iotNameThing_ingredientName?: PrimitiveOverrideProps<TextFieldProps>;
    year_dayOfYear_iotNameThing_ingredientName?: PrimitiveOverrideProps<TextFieldProps>;
    realTime?: PrimitiveOverrideProps<TextAreaFieldProps>;
    scaleActions?: PrimitiveOverrideProps<TextAreaFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HourUpdateFormProps = React.PropsWithChildren<{
    overrides?: HourUpdateFormOverridesProps | undefined | null;
} & {
    year_dayOfYear_hourOfDay_iotNameThing_ingredientName?: string;
    hour?: any;
    onSubmit?: (fields: HourUpdateFormInputValues) => HourUpdateFormInputValues;
    onSuccess?: (fields: HourUpdateFormInputValues) => void;
    onError?: (fields: HourUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HourUpdateFormInputValues) => HourUpdateFormInputValues;
    onValidate?: HourUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HourUpdateForm(props: HourUpdateFormProps): React.ReactElement;
