"use client"

import Link from "next/link"
import ForgotForm from "@/components/auth/forgot-password/forgot-form"
import { buttonVariants } from "@/components/ui/button"
import { useTranslations } from 'next-intl';

export default function ForgotPassword() {

    const t = useTranslations('Auth.ForgotPassword');

    return (
        <div>
            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {t("title")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                {t("Text")}
            </p>

            <ForgotForm />

            <p className="mt-5 text-center text-sm text-gray-500">
                {t("YesAccount")}
                <Link href={"/login"} className={buttonVariants({ variant: 'link', size: 'sm' })}
                style={{ color: '#1D9F76' }}>
                    {t("Login")}
                </Link>
            </p>
        </div>
    )
}
