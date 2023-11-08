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
export declare type WeekUpdateFormInputValues = {
    weekOfYear_iotNameThing?: string;
    monthOfYear_iotNameThing?: string;
    scaleActions?: string;
};
export declare type WeekUpdateFormValidationValues = {
    weekOfYear_iotNameThing?: ValidationFunction<string>;
    monthOfYear_iotNameThing?: ValidationFunction<string>;
    scaleActions?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WeekUpdateFormOverridesProps = {
    WeekUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    weekOfYear_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    monthOfYear_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    scaleActions?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type WeekUpdateFormProps = React.PropsWithChildren<{
    overrides?: WeekUpdateFormOverridesProps | undefined | null;
} & {
    weekOfYear_iotNameThing?: string;
    week?: any;
    onSubmit?: (fields: WeekUpdateFormInputValues) => WeekUpdateFormInputValues;
    onSuccess?: (fields: WeekUpdateFormInputValues) => void;
    onError?: (fields: WeekUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WeekUpdateFormInputValues) => WeekUpdateFormInputValues;
    onValidate?: WeekUpdateFormValidationValues;
} & React.CSSProperties>;
export default function WeekUpdateForm(props: WeekUpdateFormProps): React.ReactElement;
