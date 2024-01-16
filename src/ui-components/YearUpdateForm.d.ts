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
export declare type YearUpdateFormInputValues = {
    year_iotNameThing?: string;
    ingredientName_weight?: string;
    scaleActions?: string;
    lastConnected?: number;
};
export declare type YearUpdateFormValidationValues = {
    year_iotNameThing?: ValidationFunction<string>;
    ingredientName_weight?: ValidationFunction<string>;
    scaleActions?: ValidationFunction<string>;
    lastConnected?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type YearUpdateFormOverridesProps = {
    YearUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    year_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    ingredientName_weight?: PrimitiveOverrideProps<TextFieldProps>;
    scaleActions?: PrimitiveOverrideProps<TextAreaFieldProps>;
    lastConnected?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type YearUpdateFormProps = React.PropsWithChildren<{
    overrides?: YearUpdateFormOverridesProps | undefined | null;
} & {
    year_iotNameThing?: string;
    year?: any;
    onSubmit?: (fields: YearUpdateFormInputValues) => YearUpdateFormInputValues;
    onSuccess?: (fields: YearUpdateFormInputValues) => void;
    onError?: (fields: YearUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: YearUpdateFormInputValues) => YearUpdateFormInputValues;
    onValidate?: YearUpdateFormValidationValues;
} & React.CSSProperties>;
export default function YearUpdateForm(props: YearUpdateFormProps): React.ReactElement;
