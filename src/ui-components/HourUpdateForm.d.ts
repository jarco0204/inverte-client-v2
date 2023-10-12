/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HourUpdateFormInputValues = {
    dayOfYear_hourOfDay_iotNameThing?: string;
    dayOfYear_iotNameThing?: string;
    minuteOfHour_secondOfMinute?: string;
    realTime?: string;
    scaleActions?: string;
    createdAt?: string;
};
export declare type HourUpdateFormValidationValues = {
    dayOfYear_hourOfDay_iotNameThing?: ValidationFunction<string>;
    dayOfYear_iotNameThing?: ValidationFunction<string>;
    minuteOfHour_secondOfMinute?: ValidationFunction<string>;
    realTime?: ValidationFunction<string>;
    scaleActions?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HourUpdateFormOverridesProps = {
    HourUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    dayOfYear_hourOfDay_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    dayOfYear_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    minuteOfHour_secondOfMinute?: PrimitiveOverrideProps<TextFieldProps>;
    realTime?: PrimitiveOverrideProps<TextAreaFieldProps>;
    scaleActions?: PrimitiveOverrideProps<TextAreaFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HourUpdateFormProps = React.PropsWithChildren<{
    overrides?: HourUpdateFormOverridesProps | undefined | null;
} & {
    dayOfYear_hourOfDay_iotNameThing?: string;
    hour?: any;
    onSubmit?: (fields: HourUpdateFormInputValues) => HourUpdateFormInputValues;
    onSuccess?: (fields: HourUpdateFormInputValues) => void;
    onError?: (fields: HourUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HourUpdateFormInputValues) => HourUpdateFormInputValues;
    onValidate?: HourUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HourUpdateForm(props: HourUpdateFormProps): React.ReactElement;
