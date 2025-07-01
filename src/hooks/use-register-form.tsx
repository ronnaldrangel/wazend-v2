"use client"

import { useState, useCallback } from "react"
import { usePasswordValidation } from "./use-password-validation"

interface FormData {
    name: string
    email: string
    phone: string
    password: string
}

interface FormErrors {
    name?: string
    email?: string
    phone?: string
    password?: string
}

const initialFormData: FormData = {
    name: "",
    email: "",
    phone: "",
    password: "",
}

export function useSignUpForm() {
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [errors, setErrors] = useState<FormErrors>({})
    const { passwordConditions, validatePassword } = usePasswordValidation()

    const validateName = (name: string): string | undefined => {
        if (!name.trim()) {
            return "El nombre es requerido"
        }
        if (name.trim().length < 2) {
            return "El nombre debe tener al menos 2 caracteres"
        }
        return undefined
    }

    const validateEmail = (email: string): string | undefined => {
        if (!email) {
            return "El correo electrónico es requerido"
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return "Por favor, ingresa un correo electrónico válido"
        }

        return undefined
    }

    const validatePasswordField = (password: string): string | undefined => {
        if (!password) {
            return "La contraseña es requerida"
        }

        if (!isPasswordValid()) {
            return "La contraseña no cumple con todos los requisitos"
        }

        return undefined
    }

    const updateField = useCallback(
        (field: keyof FormData, value: string) => {
            setFormData((prev) => ({ ...prev, [field]: value }))

            // Validate password conditions when password changes
            if (field === "password") {
                validatePassword(value)
            }

            // Clear error when user starts typing
            if (errors[field]) {
                setErrors((prev) => ({ ...prev, [field]: undefined }))
            }
        },
        [errors, validatePassword],
    )

    const validateForm = useCallback((): boolean => {
        const newErrors: FormErrors = {}

        const nameError = validateName(formData.name)
        if (nameError) newErrors.name = nameError

        const emailError = validateEmail(formData.email)
        if (emailError) newErrors.email = emailError

        const passwordError = validatePasswordField(formData.password)
        if (passwordError) newErrors.password = passwordError

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }, [formData])

    const isPasswordValid = useCallback((): boolean => {
        return Object.values(passwordConditions).every(Boolean)
    }, [passwordConditions])

    const resetForm = useCallback(() => {
        setFormData(initialFormData)
        setErrors({})
    }, [])

    return {
        formData,
        errors,
        updateField,
        validateForm,
        isPasswordValid,
        resetForm,
        passwordConditions
    }
}
