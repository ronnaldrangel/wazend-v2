"use client"

import { useState, useCallback } from "react"

export interface PasswordConditions {
    uppercase: boolean
    lowercase: boolean
    number: boolean
    specialChar: boolean
    length: boolean
}

export interface PasswordStrength {
    score: number // 0-5
    label: string
    color: string
}

const initialConditions: PasswordConditions = {
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    length: false,
}

export function usePasswordValidation(minLength = 6) {
    const [passwordConditions, setPasswordConditions] = useState<PasswordConditions>(initialConditions)

    const validatePassword = useCallback(
        (password: string) => {
            const conditions = {
                uppercase: /[A-Z]/.test(password),
                lowercase: /[a-z]/.test(password),
                number: /\d/.test(password),
                specialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
                length: password.length >= minLength,
            }

            setPasswordConditions(conditions)
            return conditions
        },
        [minLength],
    )

    const isPasswordValid = useCallback((): boolean => {
        return Object.values(passwordConditions).every(Boolean)
    }, [passwordConditions])

    const getPasswordStrength = useCallback(
        (password: string): PasswordStrength => {
            const conditions = validatePassword(password)
            const score = Object.values(conditions).filter(Boolean).length

            const strengthMap = {
                0: { label: "Muy débil", color: "text-red-600" },
                1: { label: "Muy débil", color: "text-red-600" },
                2: { label: "Débil", color: "text-orange-600" },
                3: { label: "Regular", color: "text-yellow-600" },
                4: { label: "Fuerte", color: "text-green-600" },
                5: { label: "Muy fuerte", color: "text-green-700" },
            }

            return {
                score,
                ...strengthMap[score as keyof typeof strengthMap],
            }
        },
        [validatePassword],
    )

    const resetValidation = useCallback(() => {
        setPasswordConditions(initialConditions)
    }, [])

    return {
        passwordConditions,
        validatePassword,
        isPasswordValid,
        getPasswordStrength,
        resetValidation,
    }
}
