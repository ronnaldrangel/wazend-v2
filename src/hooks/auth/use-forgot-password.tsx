"use client"

import { useForm } from "../core/use-form"
import { useFieldValidation } from "../core/use-field-validation"

interface ForgotPasswordFormData extends Record<string, unknown> {
    email: string
}

const initialValues: ForgotPasswordFormData = {
    email: "",
}

export function useForgotPasswordForm() {
    const validators = useFieldValidation()

    const formConfig = {
        initialValues,
        validators: {
            email: validators.email,
        },
        requiredFields: ["email"] as (keyof ForgotPasswordFormData)[],
    }

    return useForm(formConfig)
}
