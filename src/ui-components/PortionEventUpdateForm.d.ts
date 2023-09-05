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
export declare type PortionEventUpdateFormInputValues = {
    iotNameThing?: string;
    timestamp?: string;
    batchPortionID?: number;
    inventoryWeight?: number;
    batchPortionWeightAR?: string;
    batchPortionStatusAR?: string;
    ingredientName?: string;
    lowerErrorLimit?: number;
    upperErrorLimit?: number;
    correctWeight?: number;
    portionTimeTaken?: number;
};
export declare type PortionEventUpdateFormValidationValues = {
    iotNameThing?: ValidationFunction<string>;
    timestamp?: ValidationFunction<string>;
    batchPortionID?: ValidationFunction<number>;
    inventoryWeight?: ValidationFunction<number>;
    batchPortionWeightAR?: ValidationFunction<string>;
    batchPortionStatusAR?: ValidationFunction<string>;
    ingredientName?: ValidationFunction<string>;
    lowerErrorLimit?: ValidationFunction<number>;
    upperErrorLimit?: ValidationFunction<number>;
    correctWeight?: ValidationFunction<number>;
    portionTimeTaken?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PortionEventUpdateFormOverridesProps = {
    PortionEventUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
    timestamp?: PrimitiveOverrideProps<TextFieldProps>;
    batchPortionID?: PrimitiveOverrideProps<TextFieldProps>;
    inventoryWeight?: PrimitiveOverrideProps<TextFieldProps>;
    batchPortionWeightAR?: PrimitiveOverrideProps<TextFieldProps>;
    batchPortionStatusAR?: PrimitiveOverrideProps<TextFieldProps>;
    ingredientName?: PrimitiveOverrideProps<TextFieldProps>;
    lowerErrorLimit?: PrimitiveOverrideProps<TextFieldProps>;
    upperErrorLimit?: PrimitiveOverrideProps<TextFieldProps>;
    correctWeight?: PrimitiveOverrideProps<TextFieldProps>;
    portionTimeTaken?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PortionEventUpdateFormProps = React.PropsWithChildren<{
    overrides?: PortionEventUpdateFormOverridesProps | undefined | null;
} & {
    timestamp?: string;
    portionEvent?: any;
    onSubmit?: (fields: PortionEventUpdateFormInputValues) => PortionEventUpdateFormInputValues;
    onSuccess?: (fields: PortionEventUpdateFormInputValues) => void;
    onError?: (fields: PortionEventUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PortionEventUpdateFormInputValues) => PortionEventUpdateFormInputValues;
    onValidate?: PortionEventUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PortionEventUpdateForm(props: PortionEventUpdateFormProps): React.ReactElement;
