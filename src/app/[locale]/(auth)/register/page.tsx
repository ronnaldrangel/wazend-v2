"use client"

import Link from "next/link"
import SignUpForm from "@/components/auth/register/register-form"
import { buttonVariants } from "@/components/ui/button"

export default function SignUp() {
    return (
        <div>
            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                🎉 Regístrate y obtén tu prueba gratis
            </h2>

            <SignUpForm />

            <p className="mt-5 text-center text-sm text-gray-500">
                ¿Tienes una cuenta?{" "}
                <Link href="/login" className={buttonVariants({ variant: "link", size: "sm" })}
                style={{ color: "#1D9F76" }}>
                    Iniciar sesión
                </Link>
            </p>
        </div>
    )
}
