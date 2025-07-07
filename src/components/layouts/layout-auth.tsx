import type React from "react"
import Link from "next/link"
import Image from "next/image"
import SelectLanguages from "./components/switch-languages"

const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen bg-white dark:bg-zinc-900">
            <div className="flex min-h-full flex-1">
                <div className="relative hidden w-1/2 lg:block">
                    <Image
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/images/backgrounds/bg-authentication.webp"
                        alt="Background"
                        priority={true}
                        width={960}
                        height={1080}
                    />
                </div>
                <div className="flex flex-1 w-1/2 flex-col justify-center px-8 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <Link href="/">
                            <Image className="h-8 w-auto" src="/images/logos/logo.svg" alt="Logo" width={236} height={60} />
                        </Link>
                        <main>{children}</main>
                    </div>
                </div>
                <div className="fixed bottom-7 left-5 z-50 flex items-center shadow-lg hover:shadow-xl transition-all duration-300">
                    <SelectLanguages />
                </div>
            </div>
        </div>
    )
}

export default LayoutAuth
