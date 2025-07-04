import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function ForgotPasswordLink({text}: {text: string}) {
    return (
        <Link
            href="/forgot-password"
            className={buttonVariants({ variant: "link", size: "sm" })}
            style={{ color: "#1D9F76" }}
        >
            { text }
        </Link>
    )
}
