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
export declare type IngredientUpdateFormInputValues = {
    ingredient_name?: string;
    iotNameThing?: string;
};
export declare type IngredientUpdateFormValidationValues = {
    ingredient_name?: ValidationFunction<string>;
    iotNameThing?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IngredientUpdateFormOverridesProps = {
    IngredientUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ingredient_name?: PrimitiveOverrideProps<TextFieldProps>;
    iotNameThing?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type IngredientUpdateFormProps = React.PropsWithChildren<{
    overrides?: IngredientUpdateFormOverridesProps | undefined | null;
} & {
    ingredient_name?: string;
    ingredient?: any;
    onSubmit?: (fields: IngredientUpdateFormInputValues) => IngredientUpdateFormInputValues;
    onSuccess?: (fields: IngredientUpdateFormInputValues) => void;
    onError?: (fields: IngredientUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IngredientUpdateFormInputValues) => IngredientUpdateFormInputValues;
    onValidate?: IngredientUpdateFormValidationValues;
} & React.CSSProperties>;
export default function IngredientUpdateForm(props: IngredientUpdateFormProps): React.ReactElement;
