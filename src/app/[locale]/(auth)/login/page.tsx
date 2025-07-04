"use client"

import { useEffect, useRef } from "react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import LoginGoogle from "@/components/auth/login/login-google"
import LoginForm from "@/components/auth/login/login-form"
import { buttonVariants } from "@/components/ui/button"
import { useTranslations } from 'next-intl';

export default function SignIn() {

    const activatedToastRef = useRef(false)
    const searchParams = useSearchParams()
    const router = useRouter()
    const t = useTranslations('Auth.Login');

    useEffect(() => {
        const activation = searchParams?.get("activation")
        if (activation === "true" && !activatedToastRef.current) {
            activatedToastRef.current = true
            toast.success("Cuenta activada exitosamente.")
            router.replace(window.location.pathname)
        }
    }, [searchParams, router])

    return (
        <div>
            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900">{t("title")}</h2>

            <LoginGoogle />

            <LoginForm />

            <p className="mt-6 text-center text-sm text-gray-500">
                {t("NoAccount")}
                <Link href={"/register"} className={buttonVariants({ variant: "link", size: "sm" })}
                style={{ color: "#1D9F76" }}
                >
                    {t("Register")}
                </Link>
            </p>
        </div>
    )
}
