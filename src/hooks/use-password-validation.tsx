"use client"

import { useState, useCallback } from "react"

interface PasswordConditions {
    uppercase: boolean
    lowercase: boolean
    number: boolean
    specialChar: boolean
    length: boolean
}

const initialConditions: PasswordConditions = {
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    length: false,
}

export function usePasswordValidation() {
    const [passwordConditions, setPasswordConditions] = useState<PasswordConditions>(initialConditions)

    const validatePassword = useCallback((password: string) => {
        setPasswordConditions({
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[!@#$%^&*]/.test(password),
            length: password.length >= 6,
        })
    }, [])

    return {
        passwordConditions,
        validatePassword,
    }
}
