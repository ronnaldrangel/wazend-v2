import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Recaptcha from "@/components/cloudflare/catpcha";
import Spin from "@/components/loaders/loader-spin";
import { useResetPasswordForm } from "@/hooks/auth/use-reset-password";
import { api_back } from "@/lib/api/api";
import { useRouter } from "next/navigation"
import PasswordField from "@/components/auth/common/password-field"
import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { useTranslations } from 'next-intl';

interface PasswordConditions {
    uppercase: boolean
    lowercase: boolean
    number: boolean
    specialChar: boolean
    length: boolean
}

export default function ResetPasswordForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { formData, errors, updateField, resetForm, validatePasswordFields, passwordConditions } = useResetPasswordForm();

    const [captchaToken, setCaptchaToken] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();

    const t = useTranslations('Auth.ResetPassword');

    const tokenRestablecimiento = searchParams?.get("code");

    if (!tokenRestablecimiento) {
        return(
            <div className="mt-8 flex flex-col justify-center items-center">
                <p className="text-center text-sm text-gray-500">
                    {t("InvalidCode")}
                </p>
            </div>
        )
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const passwordValidator = validatePasswordFields(formData.password, formData.confirmPassword)
        if (passwordValidator ) {
            toast.error(passwordValidator)
            return
        }

        if (!captchaToken) {
            toast.error(t("CaptchaIncorrect"))
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await api_back.post(
                `/api/auth/reset-password`,
                {
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    code: tokenRestablecimiento,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            if (result.status === 200) {
                toast.success(t("Success"))
                resetForm();
                router.replace('/login');
            }
            else {
                toast.error(t("Errors"), result.data?.message);
            }
        } catch (error) {
            toast.error(t("Errors") + (error instanceof Error ? error.message : String(error)));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("Password.Password")}
                </label>
                <PasswordField
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => {
                        updateField("password", e.target.value)
                    }}
                    placeholder="••••••••"
                    minLength={6}
                    required
                    error={errors.password}
                    className="mt-2"
                />
            </div>

            <ul className="mt-2 space-y-1 text-sm">
                {Object.entries(passwordConditions).map(([key, value]) => {
                    const labels: Record<keyof PasswordConditions, string> = {
                        uppercase: t("Password.PasswordConditions.Uppercase"),
                        lowercase: t("Password.PasswordConditions.Lowercase"),
                        number: t("Password.PasswordConditions.Number"),
                        specialChar: t("Password.PasswordConditions.SpecialChar"),
                        length: t("Password.PasswordConditions.Length"),
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

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("ConfirmPassword")}
                </label>
                <PasswordField
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    placeholder="••••••••"
                    minLength={6}
                    required
                    error={errors.confirmPassword}
                    className="mt-2"
                />
            </div>

            <Recaptcha onVerify={setCaptchaToken} />

            <Button type="submit" className="w-full bg-[#1D9F76] hover:bg-[#157a5b]" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Spin />
                    </>
                ) : (
                    t("Submit")
                )}
            </Button>
        </form>
    );
}