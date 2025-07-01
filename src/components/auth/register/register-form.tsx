"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PhoneInput from "@/components/ui/phone-input"
import PasswordFieldWithValidation from "@/components/auth/common/password-field"
import Recaptcha from "@/components/cloudflare/catpcha"
import Spin from "@/components/loaders/loader-spin"
import { useSignUpForm } from "@/hooks/use-register-form"
import { backend_config } from "@/config/config"
import { api_back, api_n8n } from "@/lib/api/api"
import { CheckCircleIcon } from "@heroicons/react/24/outline"

interface PasswordConditions {
    uppercase: boolean
    lowercase: boolean
    number: boolean
    specialChar: boolean
    length: boolean
}


export default function SignUpForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [captchaToken, setCaptchaToken] = useState("")
    const router = useRouter()

    const { formData, errors, updateField, validateForm, isPasswordValid, resetForm, passwordConditions } = useSignUpForm()
    const [showPasswordConditions, setShowPasswordConditions] = useState(false);

    const generateUsername = (email: string) => email.replace(/[^a-zA-Z0-9]/g, "")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        if (!captchaToken) {
            toast.error("Codigo captcha incorrecto")
            setIsSubmitting(false)
            return
        }

        setIsSubmitting(true)

        try {
            const username = generateUsername(formData.email)

            await api_back.post(
                `/api/auth/local/register`,
                {
                    username,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${backend_config.api_token}`,
                        "Content-Type": "application/json",
                    },
                },
            )

            toast.success("Registro exitoso.")

            await api_n8n.post('/create-new-user', { //register de user en n8n
                username,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
            })

            resetForm()
            router.replace("/email-confirmation")
        } catch {
            toast.error("Ya existe esa cuenta en nuestro sistema.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Nombre completo
                </label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Tu nombre completo"
                    required
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="mt-2"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Correo electrónico
                </label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@ejemplo.com"
                    required
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="mt-2"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                    WhatsApp (opcional)
                </label>
                <PhoneInput
                    id="phone"
                    name="phone"
                    placeholder="Ingresa tu número"
                    defaultCountry="ES"
                    value={formData.phone}
                    onChange={(value) => updateField("phone", value || "")}
                    className="mt-2 w-full"
                />
                <p className="mt-2 text-xs text-gray-500">Solo para contacto y soporte</p>
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                >
                    Contraseña
                </label>

                <PasswordFieldWithValidation
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => {
                        setShowPasswordConditions(true)
                        updateField("password", e.target.value)
                    }}
                    error={errors.password}
                />
            </div>

            {showPasswordConditions && (
                <ul className="mt-2 space-y-1 text-sm">
                    {Object.entries(passwordConditions).map(([key, value]) => {
                        const labels: Record<keyof PasswordConditions, string> = {
                            uppercase: "Una letra mayúscula",
                            lowercase: "Una letra minúscula",
                            number: "Un número",
                            specialChar: "Un carácter especial",
                            length: "Al menos 6 caracteres",
                        }
                        return (
                            <li
                                key={key}
                                className={`flex items-center space-x-2 ${value ? 'text-primary' : 'text-gray-500'}`}
                            >
                                <CheckCircleIcon className="h-4 w-4" />
                                <span>{labels[key as keyof PasswordConditions]}</span>
                            </li>
                        )
                    })}
                </ul>
            )}

            <Recaptcha onVerify={setCaptchaToken} />

            <Button type="submit" className="w-full bg-[#1D9F76] hover:bg-[#157a5b]" disabled={isSubmitting || !isPasswordValid()}>
                {isSubmitting ? (
                    <>
                        <Spin/> Cargando
                    </>
                ) : (
                    "Regístrate"
                )}
            </Button>
        </form>
    )
}
