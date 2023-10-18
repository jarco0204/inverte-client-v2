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
export declare type YearCreateFormInputValues = {
    year_iotNameThing?: string;
    ingredientName_weight?: string;
    lastConnected?: number;
    scaleActions?: string;
};
export declare type YearCreateFormValidationValues = {
    year_iotNameThing?: ValidationFunction<string>;
    ingredientName_weight?: ValidationFunction<string>;
    lastConnected?: ValidationFunction<number>;
    scaleActions?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type YearCreateFormOverridesProps = {
    YearCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    year_iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    ingredientName_weight?: PrimitiveOverrideProps<TextFieldProps>;
    lastConnected?: PrimitiveOverrideProps<TextFieldProps>;
    scaleActions?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type YearCreateFormProps = React.PropsWithChildren<{
    overrides?: YearCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: YearCreateFormInputValues) => YearCreateFormInputValues;
    onSuccess?: (fields: YearCreateFormInputValues) => void;
    onError?: (fields: YearCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: YearCreateFormInputValues) => YearCreateFormInputValues;
    onValidate?: YearCreateFormValidationValues;
} & React.CSSProperties>;
export default function YearCreateForm(props: YearCreateFormProps): React.ReactElement;
