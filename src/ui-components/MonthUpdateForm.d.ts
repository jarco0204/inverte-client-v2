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
export declare type MonthUpdateFormInputValues = {
    monthOfYear_iotNameThing?: string;
    year_iotNameThing?: string;
    scaleActions?: string;
};
export declare type MonthUpdateFormValidationValues = {
    monthOfYear_iotNameThing?: ValidationFunction<string>;
    year_iotNameThing?: ValidationFunction<string>;
    scaleActions?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MonthUpdateFormOverridesProps = {
    MonthUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    monthOfYear_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    year_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    scaleActions?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type MonthUpdateFormProps = React.PropsWithChildren<{
    overrides?: MonthUpdateFormOverridesProps | undefined | null;
} & {
    monthOfYear_iotNameThing?: string;
    month?: any;
    onSubmit?: (fields: MonthUpdateFormInputValues) => MonthUpdateFormInputValues;
    onSuccess?: (fields: MonthUpdateFormInputValues) => void;
    onError?: (fields: MonthUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MonthUpdateFormInputValues) => MonthUpdateFormInputValues;
    onValidate?: MonthUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MonthUpdateForm(props: MonthUpdateFormProps): React.ReactElement;
