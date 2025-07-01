"use client"

import { useState, useCallback } from "react"

export interface SubmitState {
    isSubmitting: boolean
    error: string | null
    success: boolean
}

export function useSubmitState() {
    const [state, setState] = useState<SubmitState>({
        isSubmitting: false,
        error: null,
        success: false,
    })

    const setSubmitting = useCallback((isSubmitting: boolean) => {
        setState((prev) => ({ ...prev, isSubmitting, error: null }))
    }, [])

    const setError = useCallback((error: string) => {
        setState((prev) => ({ ...prev, error, isSubmitting: false }))
    }, [])

    const setSuccess = useCallback((success: boolean) => {
        setState((prev) => ({ ...prev, success, isSubmitting: false, error: null }))
    }, [])

    const reset = useCallback(() => {
        setState({ isSubmitting: false, error: null, success: false })
    }, [])

    return {
        ...state,
        setSubmitting,
        setError,
        setSuccess,
        reset,
    }
}
