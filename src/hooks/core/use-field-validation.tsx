"use client"

import { useCallback } from "react"

export interface ValidationRule {
    test: (value: string) => boolean
    message: string
}

export interface FieldValidators {
    email: (value: string) => string | undefined
    password: (value: string, minLength?: number) => string | undefined
    name: (value: string, minLength?: number) => string | undefined
    phone: (value: string) => string | undefined
    confirmPassword: (value: string, originalPassword: string) => string | undefined
    required: (value: string, fieldName?: string) => string | undefined
    custom: (rules: ValidationRule[]) => (value: string) => string | undefined
}

export function useFieldValidation(): FieldValidators {
    const validateEmail = useCallback((value: string): string | undefined => {
        if (!value.trim()) {
            return "El correo electrónico es requerido"
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
            return "Por favor, ingresa un correo electrónico válido"
        }

        return undefined
    }, [])

    const validatePassword = useCallback((value: string, minLength = 6): string | undefined => {
        if (!value) {
            return "La contraseña es requerida"
        }

        if (value.length < minLength) {
            return `La contraseña debe tener al menos ${minLength} caracteres`
        }

        return undefined
    }, [])

    const validateName = useCallback((value: string, minLength = 2): string | undefined => {
        if (!value.trim()) {
            return "El nombre es requerido"
        }

        if (value.trim().length < minLength) {
            return `El nombre debe tener al menos ${minLength} caracteres`
        }

        return undefined
    }, [])

    const validatePhone = useCallback((value: string): string | undefined => {
        // Phone is optional, so only validate if provided
        if (value && value.length > 0 && value.length < 10) {
            return "Por favor, ingresa un número de teléfono válido"
        }

        return undefined
    }, [])

    const validateConfirmPassword = useCallback((value: string, originalPassword: string): string | undefined => {
        if (!value) {
            return "Confirma tu contraseña"
        }

        if (value !== originalPassword) {
            return "Las contraseñas no coinciden"
        }

        return undefined
    }, [])

    const validateRequired = useCallback((value: string, fieldName = "Este campo"): string | undefined => {
        if (!value.trim()) {
            return `${fieldName} es requerido`
        }
        return undefined
    }, [])

    const validateCustom = useCallback(
        (rules: ValidationRule[]) =>
            (value: string): string | undefined => {
                for (const rule of rules) {
                    if (!rule.test(value)) {
                        return rule.message
                    }
                }
                return undefined
            },
        [],
    )

    return {
        email: validateEmail,
        password: validatePassword,
        name: validateName,
        phone: validatePhone,
        confirmPassword: validateConfirmPassword,
        required: validateRequired,
        custom: validateCustom,
    }
}
