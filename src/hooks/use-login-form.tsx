"use client"

import { useState, useCallback } from "react"

interface FormData {
    email: string
    password: string
}

interface FormErrors {
    email?: string
    password?: string
}

const initialFormData: FormData = {
    email: "",
    password: "",
}

export function useSignInForm() {
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [errors, setErrors] = useState<FormErrors>({})

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

    const validatePassword = (password: string): string | undefined => {
        if (!password) {
            return "La contraseña es requerida"
        }

        if (password.length < 6) {
            return "La contraseña debe tener al menos 6 caracteres"
        }

        return undefined
    }

    const updateField = useCallback(
        (field: keyof FormData, value: string) => {
            setFormData((prev) => ({ ...prev, [field]: value }))

            // Clear error when user starts typing
            if (errors[field]) {
                setErrors((prev) => ({ ...prev, [field]: undefined }))
            }
        },
        [errors],
    )

    const validateForm = useCallback((): boolean => {
        const newErrors: FormErrors = {}

        const emailError = validateEmail(formData.email)
        if (emailError) newErrors.email = emailError

        const passwordError = validatePassword(formData.password)
        if (passwordError) newErrors.password = passwordError

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }, [formData])

    const resetForm = useCallback(() => {
        setFormData(initialFormData)
        setErrors({})
    }, [])

    return {
        formData,
        errors,
        updateField,
        validateForm,
        resetForm,
    }
}
