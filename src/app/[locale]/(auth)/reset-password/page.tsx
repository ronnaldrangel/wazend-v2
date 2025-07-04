"use client"

import Link from "next/link"
import ResetPasswordForm from "@/components/auth/reset-password/reset-form"
import { buttonVariants } from "@/components/ui/button"
import { useTranslations } from 'next-intl';

export default function SignUp() {

    const t = useTranslations('Auth.ResetPassword');

    return (
        <div>
            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {t("title")}
            </h2>

            <ResetPasswordForm />

            <p className="mt-5 text-center text-sm text-gray-500">
                <Link href={`/login`} className={buttonVariants({ variant: 'link', size: 'sm' })}
                style={{ color: '#1D9F76' }}>
                    {t("Login")}
                </Link>
            </p>
        </div>
    )
}
