"use client"

import { useCallback } from "react"
import { useForm } from "../core/use-form"
import { useFieldValidation } from "../core/use-field-validation"
import { usePasswordValidation } from "../core/use-password-validation"

interface ResetPasswordFormData extends Record<string, unknown> {
    password: string
    confirmPassword: string
}

const initialValues: ResetPasswordFormData = {
    password: "",
    confirmPassword: "",
}

export function useResetPasswordForm() {
    const validators = useFieldValidation()
    const { passwordConditions, validatePassword, isPasswordValid } = usePasswordValidation()

    const validatePasswordWithConditions = useCallback(
        (value: string): string | undefined => {
            validatePassword(value)

            if (!value) {
                return "La contraseña es requerida"
            }

            if (!isPasswordValid()) {
                return "La contraseña no cumple con todos los requisitos"
            }

            return undefined
        },
        [validatePassword, isPasswordValid],
    )

    const formConfig = {
        initialValues,
        validators: {
            password: validatePasswordWithConditions,
            confirmPassword: () => {
                // This will be replaced after form is created
                return undefined;
            },
        },
        requiredFields: ["password", "confirmPassword"] as (keyof ResetPasswordFormData)[],
    }

    const form = useForm(formConfig)
    const { formData } = form

    // Define confirmPassword validator with access to formData
    const validateConfirmPasswordField = useCallback(
        (value: string): string | undefined => {
            return validators.confirmPassword(value, (formData.password ?? "") as string)
        },
        [validators, formData.password],
    )

    // Función única para validar ambos campos a la vez
    const validatePasswordFields = useCallback(
        (password: string, confirmPassword: string) => {
            const passwordError = validatePasswordWithConditions(password)
            if (passwordError) return passwordError

            const confirmPasswordError = validateConfirmPasswordField(confirmPassword)
            if (confirmPasswordError) return confirmPasswordError

            return undefined
        },
        [validatePasswordWithConditions, validateConfirmPasswordField]
    )

    return {
        ...form,
        passwordConditions,
        isPasswordValid,
        validatePasswordFields,
    }
}
