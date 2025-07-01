"use client"

import Link from "next/link"
import ResetPasswordForm from "@/components/auth/reset-password/reset-form"
import { buttonVariants } from "@/components/ui/button"

export default function SignUp() {
    return (
        <div>
            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Restablecer contraseña
            </h2>

            <ResetPasswordForm />

            <p className="mt-10 text-center text-sm text-gray-500">
                <Link href="/login" className={buttonVariants({ variant: 'link', size: 'sm' })}>
                Volver al inicio de sesión
                </Link>
            </p>
        </div>
    )
}
