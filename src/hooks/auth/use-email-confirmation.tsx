"use client"

import { useForm } from "../core/use-form"
import { useFieldValidation } from "../core/use-field-validation"

interface EmailConfirmationFormData extends Record<string, unknown> {
    email: string
}

const initialValues: EmailConfirmationFormData = {
    email: "",
}

export function useEmailConfirmationLogin() {
    const validators = useFieldValidation()

    const formConfig = {
        initialValues,
        validators: {
            email: validators.email,
        },
        requiredFields: ["email"] as (keyof EmailConfirmationFormData)[],
    }

    return useForm(formConfig)
}
