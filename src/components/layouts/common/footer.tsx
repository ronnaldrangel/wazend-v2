"use client"

import Link from "next/link"
import { data_app_config } from "@/config/config"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import SelectLanguages from "../components/switch-languages"


export default function Footer() {
    const t = useTranslations('Dashboard.Layout.Footer');
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const footerLinks = {
        legal: [
            { name: t("PrivacyPolicy"), href: `${data_app_config.url}/privacy-policy/` },
            { name: t("Terms"), href: `${data_app_config.url}/terms-of-service/` },
        ]
    }

    if (!mounted) {
        return (
            <div className="w-[220px] h-12 bg-gray-100/50 rounded-xl animate-pulse"></div>
        )
    }

    return (
        <footer className="bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 border-t border-gray-200/60 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full blur-3xl"></div>

            <div className="relative">
                <div className="relative py-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gradient-to-r from-transparent via-gray-300/50 to-transparent"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 px-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-0.5 bg-gradient-to-r from-primary/60 to-primary rounded-full"></div>
                                <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse"></div>
                                <div className="w-8 h-0.5 bg-gradient-to-l from-primary/60 to-primary rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="flex flex-col sm:flex-row items-center gap-6 text-center lg:text-left">
                            <div className="text-sm text-gray-700 font-medium">
                                © 2025{" "}
                                <span className="bg-gradient-to-r from-primary via-green-600 to-primary/80 bg-clip-text text-transparent font-bold">
                                    Neopatron Ltd.
                                </span>{" "}
                                {t("Rights")}
                            </div>

                            <div className="flex items-center gap-4">
                                {footerLinks.legal.map((link, index) => (
                                    <div key={link.name} className="flex items-center gap-4">
                                        <Link
                                            href={link.href}
                                            target={link.href.startsWith("http") ? "_blank" : undefined}
                                            className="text-sm text-gray-600 hover:text-primary transition-all duration-300 hover:underline underline-offset-4 font-medium hover:scale-105 transform"
                                        >
                                            {link.name}
                                        </Link>
                                        {index < footerLinks.legal.length - 1 && (
                                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <SelectLanguages />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

