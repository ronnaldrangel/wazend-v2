"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useSubmitState } from "../core/use-submit-state"

export interface AuthSubmitOptions<T = unknown> {
    onSuccess?: (data?: T) => void
    onError?: (error: unknown) => void
    successMessage?: string
    errorMessage?: string
    redirectTo?: string
}

export function useAuthSubmit() {
    const router = useRouter()
    const submitState = useSubmitState()

    const handleSubmit = useCallback(
        async <T = unknown>(submitFn: () => Promise<T>, options: AuthSubmitOptions<T> = {}) => {
            const { onSuccess, onError, successMessage, errorMessage, redirectTo } = options

            submitState.setSubmitting(true)

            try {
                const result = await submitFn()

                if (successMessage) {
                    toast.success(successMessage)
                }

                if (redirectTo) {
                    router.replace(redirectTo)
                }

                if (onSuccess) {
                    onSuccess(result)
                }

                submitState.setSuccess(true)
                return result
            } catch (error) {
                const message = errorMessage || "Ha ocurrido un error. Inténtalo de nuevo."
                toast.error(message)
                submitState.setError(message)

                if (onError) {
                    onError(error)
                }

                throw error
            }
        },
        [router, submitState],
    )

    return {
        ...submitState,
        handleSubmit,
    }
}
