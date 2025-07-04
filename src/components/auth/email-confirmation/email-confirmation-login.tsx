"use client"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Recaptcha from "@/components/cloudflare/catpcha"
import Spin from "@/components/loaders/loader-spin"
import { useEmailConfirmationLogin } from "@/hooks/auth/use-email-confirmation"
import { api_back } from "@/lib/api/api"
import { useTranslations } from 'next-intl';

export default function EmailConfirmationLoginForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { formData, errors, updateField, validateForm, resetForm } = useEmailConfirmationLogin()
    const [captchaToken, setCaptchaToken] = useState("")
    const t = useTranslations('Auth.EmailConfirmation');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateForm()) {
            toast.error(t("Validation"), errors)
            return
        }

        if (!captchaToken) {
            toast.error(t("CaptchaIncorrect"))
            return
        }

        setIsSubmitting(true)

        try{
            const result = await api_back.post(
                `/api/auth/send-email-confirmation`,
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
                toast.success(t("Success"))
                resetForm()
            }
            else{
                toast.error(t("Errors"), result.data?.message)
            }
        }catch(error){
            toast.error(t("Errors") + (error instanceof Error ? error.message : String(error)))
        }finally{
            setIsSubmitting(false)
        }
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("Email")}
                </label>    
                <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="youremail@example.com"
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
                        <Spin/>
                    </>
                ) : (
                    t("Send")
                )}
            </Button>
        </form>
    )

}