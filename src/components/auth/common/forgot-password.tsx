import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function ForgotPasswordLink() {
    return (
        <Link
            href="/forgot-password"
            className={buttonVariants({ variant: "link", size: "sm" })}
            style={{ color: "#1D9F76" }}
        >
            ¿Has olvidado tu contraseña?
        </Link>
    )
}
