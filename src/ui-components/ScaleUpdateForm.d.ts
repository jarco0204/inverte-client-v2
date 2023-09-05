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
export declare type ScaleUpdateFormInputValues = {
    iotNameThing?: string;
    restaurant_id?: string;
    unitOfMass?: string;
    multiplier?: number;
    firmwareVersion?: string;
};
export declare type ScaleUpdateFormValidationValues = {
    iotNameThing?: ValidationFunction<string>;
    restaurant_id?: ValidationFunction<string>;
    unitOfMass?: ValidationFunction<string>;
    multiplier?: ValidationFunction<number>;
    firmwareVersion?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ScaleUpdateFormOverridesProps = {
    ScaleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    restaurant_id?: PrimitiveOverrideProps<TextFieldProps>;
    unitOfMass?: PrimitiveOverrideProps<TextFieldProps>;
    multiplier?: PrimitiveOverrideProps<TextFieldProps>;
    firmwareVersion?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ScaleUpdateFormProps = React.PropsWithChildren<{
    overrides?: ScaleUpdateFormOverridesProps | undefined | null;
} & {
    iotNameThing?: string;
    scale?: any;
    onSubmit?: (fields: ScaleUpdateFormInputValues) => ScaleUpdateFormInputValues;
    onSuccess?: (fields: ScaleUpdateFormInputValues) => void;
    onError?: (fields: ScaleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ScaleUpdateFormInputValues) => ScaleUpdateFormInputValues;
    onValidate?: ScaleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ScaleUpdateForm(props: ScaleUpdateFormProps): React.ReactElement;
