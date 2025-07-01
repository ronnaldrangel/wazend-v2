"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PasswordField from "@/components/auth/common/password-field"
import Recaptcha from "@/components/cloudflare/catpcha"
import SpinLoader from "@/components/loaders/loader-spin"
import ForgotPasswordLink from "@/components/auth/common/forgot-password"
import { useSignInForm } from "@/hooks/use-login-form"
import { submitFormData, checkUserConfirmation } from "../logic/functions"
import { useTranslations } from 'next-intl';

export default function SignInForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [captchaToken, setCaptchaToken] = useState("")
    const searchParams = useSearchParams()
    const router = useRouter()
    const t = useTranslations('Auth.Login');

    const { formData, errors, updateField, validateForm, resetForm } = useSignInForm()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        if (!captchaToken) {
            toast.error("Codigo captcha incorrecto")
            return
        }

        setIsSubmitting(true)

        try {
            const resultados = await submitFormData(formData)

            if (resultados?.ok) {
                const callbackUrl = searchParams?.get("callbackUrl")
                router.replace(callbackUrl || "/")
                toast.success("Sesión iniciada correctamente.")

                const userCheck = await checkUserConfirmation(formData.email)
                if (userCheck.exists && !userCheck.confirmed) {
                    router.push("/email-confirmation")
                } else {
                    toast.error("Credenciales incorrectas")
                }
                resetForm()
            }
        } catch (error) {
            console.log(error)
            toast.error("Error al iniciar sesión")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("Email")}
                </label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    autoComplete="email"
                    placeholder="tu@example.com"
                    required
                    className="mt-2"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        { t("Password") }
                    </label>
                    <ForgotPasswordLink />
                </div>
                <PasswordField
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder="••••••••"
                    minLength={6}
                    required
                    error={errors.password}
                    className="mt-2"
                />
            </div>

            <Recaptcha onVerify={setCaptchaToken} />

            <Button
                type="submit"
                className="w-full bg-[#1D9F76] hover:bg-[#157a5b]"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <SpinLoader />
                    </>
                ) : (
                    t("Submit")
                )}
            </Button>
        </form>
    )
}
