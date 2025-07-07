
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import React from 'react'
import { useLocale } from "next-intl"
import { useEffect, useState } from "react"
import { Globe } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"

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

export default function SelectLanguages() {

    const pathname = usePathname()
    const locale = useLocale()

    const [selectedLanguage, setSelectedLanguage] = useState<Language>(
        languages.find((lang) => lang.code === locale) || languages[0]
    )

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


    return (
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
                                <div className="ml-3">
                                    <Image src={`/images/languages/${language.code}.webp`} width={25} height={25} alt="Check" className="w-6 h-6 object-contain" />
                                </div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
