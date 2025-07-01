"use client"

import Link from "next/link"
import ResetPasswordForm from "@/components/auth/reset-password/reset-form"
import { buttonVariants } from "@/components/ui/button"
import { useTranslations } from 'next-intl';
import { usePathname } from "next/navigation";


export default function SignUp() {

    const pathname = usePathname();

    const locale = pathname?.split("/")[1]

    const t = useTranslations('Auth.ResetPassword');

    return (
        <div>
            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {t("title")}
            </h2>

            <ResetPasswordForm />

            <p className="mt-10 text-center text-sm text-gray-500">
                <Link href={`/${locale}/login`} className={buttonVariants({ variant: 'link', size: 'sm' })}>
                    {t("Login")}
                </Link>
            </p>
        </div>
    )
}
