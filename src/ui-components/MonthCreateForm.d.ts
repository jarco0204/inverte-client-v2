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
export declare type MonthCreateFormInputValues = {
    monthOfYear_iotNameThing?: string;
    year_iotNameThing?: string;
    scaleActions?: string;
};
export declare type MonthCreateFormValidationValues = {
    monthOfYear_iotNameThing?: ValidationFunction<string>;
    year_iotNameThing?: ValidationFunction<string>;
    scaleActions?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MonthCreateFormOverridesProps = {
    MonthCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    monthOfYear_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    year_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    scaleActions?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type MonthCreateFormProps = React.PropsWithChildren<{
    overrides?: MonthCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MonthCreateFormInputValues) => MonthCreateFormInputValues;
    onSuccess?: (fields: MonthCreateFormInputValues) => void;
    onError?: (fields: MonthCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MonthCreateFormInputValues) => MonthCreateFormInputValues;
    onValidate?: MonthCreateFormValidationValues;
} & React.CSSProperties>;
export default function MonthCreateForm(props: MonthCreateFormProps): React.ReactElement;
