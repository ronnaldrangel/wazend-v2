"use client"

import Link from "next/link"
import SignUpForm from "@/components/auth/register/register-form"
import { buttonVariants } from "@/components/ui/button"
import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';


export default function SignUp() {

    const pathname = usePathname();
    const t = useTranslations('Auth.Register');
    const locale = pathname?.split("/")[1]

    return (
        <div>
            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                🎉 {t("title")}
            </h2>

            <SignUpForm />

            <p className="mt-5 text-center text-sm text-gray-500">
                {t("YesAccount")}
                <Link href={`/${locale}/login`} className={buttonVariants({ variant: "link", size: "sm" })}
                style={{ color: "#1D9F76" }}>
                    {t("Login")}
                </Link>
            </p>
        </div>
    )
}
