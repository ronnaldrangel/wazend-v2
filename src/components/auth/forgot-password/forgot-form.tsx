"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Recaptcha from "@/components/cloudflare/catpcha"
import Spin from "@/components/loaders/loader-spin"
import { useForgotPasswordForm } from "@/hooks/auth/use-forgot-password"
import { api_back } from "@/lib/api/api"

export default function ForgotPasswordForm() {

    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { formData, errors, updateField, validateForm, resetForm } = useForgotPasswordForm()
    const [captchaToken, setCaptchaToken] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateForm()) {
            toast.error("Por favor, rellena todos los campos", errors)
            return
        }

        if (!captchaToken) {
            toast.error("Codigo captcha incorrecto")
            return
        }

        setIsSubmitting(true)

        try{
            const result = await api_back.post(
                `/api/auth/forgot-password`,
                {
                    email: formData.email,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            )
            if(result.status === 200){
                toast.success('Se envió un correo para restablecer la contraseña.');
                resetForm()
                router.push("/login")
            }
            else{
                toast.error("Error al enviar el correo: ", result.data?.message)
            }
        }catch(error){
            toast.error("Error al enviar el correo: " + (error instanceof Error ? error.message : String(error)))
        }finally{
            setIsSubmitting(false)
        }
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

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

            <Recaptcha onVerify={setCaptchaToken} />

            <Button type="submit" className="w-full bg-[#1D9F76] hover:bg-[#157a5b]" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Spin/> Cargando
                    </>
                ) : (
                    "Enviar Correo"
                )}
            </Button>
        </form>
    )

}