"use client"

import { useState, useCallback } from "react"

export interface FormField {
    value: string
    error?: string
    required?: boolean
    validator?: (value: string) => string | undefined
}

export interface FormConfig<T extends Record<string, unknown>> {
    initialValues: T
    validators?: Partial<Record<keyof T, (value: string) => string | undefined>>
    requiredFields?: (keyof T)[]
}

export function useForm<T extends Record<string, unknown>>(config: FormConfig<T>) {
    const [formData, setFormData] = useState<T>(config.initialValues)
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})

    const updateField = useCallback(
        (field: keyof T, value: string) => {
            setFormData((prev) => ({ ...prev, [field]: value }))

            // Clear error when user starts typing
            if (errors[field]) {
                setErrors((prev) => ({ ...prev, [field]: undefined }))
            }

            // Mark field as touched
            setTouched((prev) => ({ ...prev, [field]: true }))
        },
        [errors],
    )

    const validateField = useCallback(
        (field: keyof T, value: string): string | undefined => {
            const validator = config.validators?.[field]
            if (validator) {
                return validator(value)
            }

            // Check if field is required
            if (config.requiredFields?.includes(field) && !value.trim()) {
                return `${String(field)} es requerido`
            }

            return undefined
        },
        [config.validators, config.requiredFields],
    )

    const validateForm = useCallback((): boolean => {
        const newErrors: Partial<Record<keyof T, string>> = {}

        Object.keys(formData).forEach((key) => {
            const field = key as keyof T
            const value = String(formData[field])
            const error = validateField(field, value)
            if (error) {
                newErrors[field] = error
            }
        })

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }, [formData, validateField])

    const resetForm = useCallback(() => {
        setFormData(config.initialValues)
        setErrors({})
        setTouched({})
    }, [config.initialValues])

    const setFieldError = useCallback((field: keyof T, error: string) => {
        setErrors((prev) => ({ ...prev, [field]: error }))
    }, [])

    return {
        formData,
        errors,
        touched,
        updateField,
        validateForm,
        resetForm,
        setFieldError,
        isFieldTouched: (field: keyof T) => touched[field] || false,
        hasErrors: Object.keys(errors).length > 0,
    }
}
