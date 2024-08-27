/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ScaleUpdateFormInputValues = {
    scaleName?: string;
    restaurant_id?: string;
    restaurantName?: string;
    ingredient?: string;
    lastConnected?: string;
    inventoryWeight?: number;
};
export declare type ScaleUpdateFormValidationValues = {
    scaleName?: ValidationFunction<string>;
    restaurant_id?: ValidationFunction<string>;
    restaurantName?: ValidationFunction<string>;
    ingredient?: ValidationFunction<string>;
    lastConnected?: ValidationFunction<string>;
    inventoryWeight?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ScaleUpdateFormOverridesProps = {
    ScaleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    scaleName?: PrimitiveOverrideProps<TextFieldProps>;
    restaurant_id?: PrimitiveOverrideProps<TextFieldProps>;
    restaurantName?: PrimitiveOverrideProps<TextFieldProps>;
    ingredient?: PrimitiveOverrideProps<TextFieldProps>;
    lastConnected?: PrimitiveOverrideProps<TextFieldProps>;
    inventoryWeight?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ScaleUpdateFormProps = React.PropsWithChildren<{
    overrides?: ScaleUpdateFormOverridesProps | undefined | null;
} & {
    scaleName?: string;
    scale?: any;
    onSubmit?: (fields: ScaleUpdateFormInputValues) => ScaleUpdateFormInputValues;
    onSuccess?: (fields: ScaleUpdateFormInputValues) => void;
    onError?: (fields: ScaleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ScaleUpdateFormInputValues) => ScaleUpdateFormInputValues;
    onValidate?: ScaleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ScaleUpdateForm(props: ScaleUpdateFormProps): React.ReactElement;
