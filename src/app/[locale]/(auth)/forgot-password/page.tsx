"use client"

import Link from "next/link"
import ForgotForm from "@/components/auth/forgot-password/forgot-form"
import { buttonVariants } from "@/components/ui/button"

export default function ForgotPassword() {

    return (
        <div>
            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Recuperar contraseña
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                Escribe tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>

            <ForgotForm />

            <p className="mt-5 text-center text-sm text-gray-500">
                ¿Ya tienes una cuenta?{' '}
                <Link href="/login" className={buttonVariants({ variant: 'link', size: 'sm' })}
                style={{ color: '#1D9F76' }}>
                Iniciar sesión
                </Link>
            </p>
        </div>
    )
}
