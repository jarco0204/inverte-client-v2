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
export declare type RestaurantCreateFormInputValues = {
    restaurant_id?: string;
    demo?: string;
    restaurantLocationNum?: string;
    displayIngredient?: number;
    restaurantName?: string;
    unitOfMass?: string;
    timeZone?: string;
    accessType?: string;
};
export declare type RestaurantCreateFormValidationValues = {
    restaurant_id?: ValidationFunction<string>;
    demo?: ValidationFunction<string>;
    restaurantLocationNum?: ValidationFunction<string>;
    displayIngredient?: ValidationFunction<number>;
    restaurantName?: ValidationFunction<string>;
    unitOfMass?: ValidationFunction<string>;
    timeZone?: ValidationFunction<string>;
    accessType?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RestaurantCreateFormOverridesProps = {
    RestaurantCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    restaurant_id?: PrimitiveOverrideProps<TextFieldProps>;
    demo?: PrimitiveOverrideProps<TextFieldProps>;
    restaurantLocationNum?: PrimitiveOverrideProps<TextFieldProps>;
    displayIngredient?: PrimitiveOverrideProps<TextFieldProps>;
    restaurantName?: PrimitiveOverrideProps<TextFieldProps>;
    unitOfMass?: PrimitiveOverrideProps<TextFieldProps>;
    timeZone?: PrimitiveOverrideProps<TextFieldProps>;
    accessType?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RestaurantCreateFormProps = React.PropsWithChildren<{
    overrides?: RestaurantCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RestaurantCreateFormInputValues) => RestaurantCreateFormInputValues;
    onSuccess?: (fields: RestaurantCreateFormInputValues) => void;
    onError?: (fields: RestaurantCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RestaurantCreateFormInputValues) => RestaurantCreateFormInputValues;
    onValidate?: RestaurantCreateFormValidationValues;
} & React.CSSProperties>;
export default function RestaurantCreateForm(props: RestaurantCreateFormProps): React.ReactElement;
