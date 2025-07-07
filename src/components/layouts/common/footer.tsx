"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { data_app_config } from "@/config/config"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"

interface Language {
    name: string
    code: string
    flag: string
    nativeName: string
}

const languages: Language[] = [
    { name: "English", code: "en", flag: "ℰ𝒩", nativeName: "English" },
    { name: "Español", code: "es", flag: "ℰ𝒮", nativeName: "Español" },
    { name: "Português", code: "pt", flag: "𝒫𝒯", nativeName: "Português" },
    { name: "Français", code: "fr", flag: "𝓕𝓡", nativeName: "Français" },
    { name: "Deutsch", code: "de", flag: "𝒟ℰ", nativeName: "Deutsch" },
]

export default function Footer() {
    const pathname = usePathname()
    const locale = useLocale()
    const t = useTranslations('Dashboard.Layout.Footer');
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const [selectedLanguage, setSelectedLanguage] = useState<Language>(
        languages.find((lang) => lang.code === locale) || languages[0]
    )

    const footerLinks = {
        legal: [
            { name: t("PrivacyPolicy"), href: `${data_app_config.url}/privacy-policy/` },
            { name: t("Terms"), href: `${data_app_config.url}/terms-of-service/` },
        ]
    }

    useEffect(() => {
        const currentLang = languages.find((lang) => lang.code === locale)
        if (currentLang) {
            setSelectedLanguage(currentLang)
        }
        else {
            setSelectedLanguage(languages[0])
        }
    }, [locale, pathname])

    const handleLanguageChange = async (newLocale: string) => {
        const newLanguage = languages.find((lang) => lang.code === newLocale)
        if (!newLanguage) return

        setSelectedLanguage(newLanguage)

        const pathSegments = pathname?.split("/") || []
        const currentLocale = pathSegments[1]

        const isLocaleInPath = languages.some(lang => lang.code === currentLocale)

        if (isLocaleInPath) {
            pathSegments[1] = newLocale
        } else {
            pathSegments.splice(1, 0, newLocale)
        }

        const newPath = pathSegments.join("/")
        window.location.href = newPath
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
                            <div className="group bg-white/90 backdrop-blur-md p-2 rounded-2xl border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/95">
                                <Select
                                    value={selectedLanguage?.code}
                                    onValueChange={handleLanguageChange}
                                >
                                    <SelectTrigger className="w-[220px] h-12 bg-transparent border-0 hover:bg-gray-50/50 transition-all duration-300 focus:ring-2 focus:ring-primary/30 rounded-xl px-3">
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-4 w-4 text-primary group-hover:rotate-12 transition-transform duration-300" />
                                                <span className="text-xl drop-shadow-sm">{selectedLanguage?.flag}</span>
                                            </div>
                                            <div className="flex flex-col items-start flex-1">
                                                <span className="text-sm font-semibold text-gray-800">
                                                    {selectedLanguage?.nativeName}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {selectedLanguage?.name}
                                                </span>
                                            </div>
                                            <div className="flex w-full">
                                                <Image src={`/images/languages/${selectedLanguage?.code}.webp`} width={25} height={25} alt="Check" className="w-6 h-6 object-contain" />
                                            </div>
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent className="min-w-[220px] bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-2xl rounded-xl overflow-hidden py-1">
                                        {languages.map((language) => (
                                            <SelectItem
                                                key={language.code}
                                                value={language.code}
                                                className={`cursor-pointer transition-all duration-200 hover:bg-primary/8 focus:bg-primary/8 rounded-lg mx-1 my-0.5 ${selectedLanguage?.code === language.code
                                                    ? "bg-primary/5 text-primary font-semibold"
                                                    : "hover:bg-gray-50/80"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3 py-1.5 w-full">
                                                    <span className="text-xl drop-shadow-sm">{language.flag}</span>
                                                    <div className="flex flex-col flex-1">
                                                        <span className="text-sm font-medium">{language.nativeName}</span>
                                                        <span className="text-xs text-gray-500">{language.name}</span>
                                                    </div>
                                                    <div className="pr-5">
                                                        <Image src={`/images/languages/${language.code}.webp`} width={25} height={25} alt="Check" className="w-6 h-6 object-contain" />
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

