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
export declare type DayUpdateFormInputValues = {
    dayOfYear_iotNameThing?: string;
    weekOfYear_iotNameThing?: string;
    realTime?: string;
    dashboardGraph?: string;
    scaleActions?: string;
};
export declare type DayUpdateFormValidationValues = {
    dayOfYear_iotNameThing?: ValidationFunction<string>;
    weekOfYear_iotNameThing?: ValidationFunction<string>;
    realTime?: ValidationFunction<string>;
    dashboardGraph?: ValidationFunction<string>;
    scaleActions?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DayUpdateFormOverridesProps = {
    DayUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    dayOfYear_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    weekOfYear_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    realTime?: PrimitiveOverrideProps<TextAreaFieldProps>;
    dashboardGraph?: PrimitiveOverrideProps<TextAreaFieldProps>;
    scaleActions?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type DayUpdateFormProps = React.PropsWithChildren<{
    overrides?: DayUpdateFormOverridesProps | undefined | null;
} & {
    dayOfYear_iotNameThing?: string;
    day?: any;
    onSubmit?: (fields: DayUpdateFormInputValues) => DayUpdateFormInputValues;
    onSuccess?: (fields: DayUpdateFormInputValues) => void;
    onError?: (fields: DayUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DayUpdateFormInputValues) => DayUpdateFormInputValues;
    onValidate?: DayUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DayUpdateForm(props: DayUpdateFormProps): React.ReactElement;
