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
export declare type RestaurantUpdateFormInputValues = {
    restaurant_id?: string;
    demo?: string;
    iotThingNames?: string;
    restaurantLocationNum?: string;
    displayIngredient?: number;
    restaurantName?: string;
    unitOfMass?: string;
    timeZone?: string;
    accessType?: string;
};
export declare type RestaurantUpdateFormValidationValues = {
    restaurant_id?: ValidationFunction<string>;
    demo?: ValidationFunction<string>;
    iotThingNames?: ValidationFunction<string>;
    restaurantLocationNum?: ValidationFunction<string>;
    displayIngredient?: ValidationFunction<number>;
    restaurantName?: ValidationFunction<string>;
    unitOfMass?: ValidationFunction<string>;
    timeZone?: ValidationFunction<string>;
    accessType?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RestaurantUpdateFormOverridesProps = {
    RestaurantUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    restaurant_id?: PrimitiveOverrideProps<TextFieldProps>;
    demo?: PrimitiveOverrideProps<TextFieldProps>;
    iotThingNames?: PrimitiveOverrideProps<TextAreaFieldProps>;
    restaurantLocationNum?: PrimitiveOverrideProps<TextFieldProps>;
    displayIngredient?: PrimitiveOverrideProps<TextFieldProps>;
    restaurantName?: PrimitiveOverrideProps<TextFieldProps>;
    unitOfMass?: PrimitiveOverrideProps<TextFieldProps>;
    timeZone?: PrimitiveOverrideProps<TextFieldProps>;
    accessType?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RestaurantUpdateFormProps = React.PropsWithChildren<{
    overrides?: RestaurantUpdateFormOverridesProps | undefined | null;
} & {
    restaurant_id?: string;
    restaurant?: any;
    onSubmit?: (fields: RestaurantUpdateFormInputValues) => RestaurantUpdateFormInputValues;
    onSuccess?: (fields: RestaurantUpdateFormInputValues) => void;
    onError?: (fields: RestaurantUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RestaurantUpdateFormInputValues) => RestaurantUpdateFormInputValues;
    onValidate?: RestaurantUpdateFormValidationValues;
} & React.CSSProperties>;
export default function RestaurantUpdateForm(props: RestaurantUpdateFormProps): React.ReactElement;
