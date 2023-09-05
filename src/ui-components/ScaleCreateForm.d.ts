/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ScaleCreateFormInputValues = {
    iotNameThing?: string;
    restaurant_id?: string;
    unitOfMass?: string;
    multiplier?: number;
    firmwareVersion?: string;
};
export declare type ScaleCreateFormValidationValues = {
    iotNameThing?: ValidationFunction<string>;
    restaurant_id?: ValidationFunction<string>;
    unitOfMass?: ValidationFunction<string>;
    multiplier?: ValidationFunction<number>;
    firmwareVersion?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ScaleCreateFormOverridesProps = {
    ScaleCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    restaurant_id?: PrimitiveOverrideProps<TextFieldProps>;
    unitOfMass?: PrimitiveOverrideProps<TextFieldProps>;
    multiplier?: PrimitiveOverrideProps<TextFieldProps>;
    firmwareVersion?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ScaleCreateFormProps = React.PropsWithChildren<{
    overrides?: ScaleCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ScaleCreateFormInputValues) => ScaleCreateFormInputValues;
    onSuccess?: (fields: ScaleCreateFormInputValues) => void;
    onError?: (fields: ScaleCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ScaleCreateFormInputValues) => ScaleCreateFormInputValues;
    onValidate?: ScaleCreateFormValidationValues;
} & React.CSSProperties>;
export default function ScaleCreateForm(props: ScaleCreateFormProps): React.ReactElement;
