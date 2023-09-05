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
export declare type WeekCreateFormInputValues = {
    weekOfYear_iotNameThing?: string;
    monthOfYear_iotNameThing?: string;
    realTime?: string;
    scaleActions?: string;
};
export declare type WeekCreateFormValidationValues = {
    weekOfYear_iotNameThing?: ValidationFunction<string>;
    monthOfYear_iotNameThing?: ValidationFunction<string>;
    realTime?: ValidationFunction<string>;
    scaleActions?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WeekCreateFormOverridesProps = {
    WeekCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    weekOfYear_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    monthOfYear_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    realTime?: PrimitiveOverrideProps<TextAreaFieldProps>;
    scaleActions?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type WeekCreateFormProps = React.PropsWithChildren<{
    overrides?: WeekCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: WeekCreateFormInputValues) => WeekCreateFormInputValues;
    onSuccess?: (fields: WeekCreateFormInputValues) => void;
    onError?: (fields: WeekCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WeekCreateFormInputValues) => WeekCreateFormInputValues;
    onValidate?: WeekCreateFormValidationValues;
} & React.CSSProperties>;
export default function WeekCreateForm(props: WeekCreateFormProps): React.ReactElement;
