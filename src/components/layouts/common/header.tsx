"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { signOut, /* useSession */ } from "next-auth/react"
import Image from "next/image"

import DesktopSection from "../components/desktop-user"
import MobileSection from "../components/mobile-user"

import { useTranslations } from "next-intl"

interface NavigationItem {
    name: string
    href: string
    trial?: boolean
    external?: boolean
}

interface UserNavigationItem {
    name: string
    href: string
    external?: boolean
    signOut?: boolean
}

export default function Header() {
    const router = useRouter()
    //const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const [currentPath, setCurrentPath] = useState(pathname)

    const t = useTranslations('Dashboard.Layout.Header');

    const navigation: NavigationItem[] = [
        { name: t("FreeTrial"), href: "/dashboard/trial", trial: true },
        { name: t("Services"), href: "/dashboard" },
        { name: t("Pricing"), href: "/dashboard/billing" },
        { name: t("Recommendations"), href: "/dashboard/affiliates" },
    ]

    const userNavigation: UserNavigationItem[] = [
        { name: t("Profile.YourProfile"), href: "/profile" },
        { name: t("Profile.Help"), href: "https://docs.wazend.net/", external: true },
        { name: t("Profile.Contact"), href: "https://wazend.net/contact", external: true },
        { name: t("Profile.SignOut"), href: "/", signOut: true },
    ]

    useEffect(() => {
        setCurrentPath(pathname)
    }, [pathname])

    const handleSignOut = async () => {
        await signOut({ redirect: false })
        router.push("/login")
    }

    const handleUserAction = (item: UserNavigationItem) => {
        if (item.signOut) {
            handleSignOut()
        }
        setIsOpen(false)
    }

    const isCurrentPath = (href: string) => {
        if (!currentPath) return false;

        const getLast = (path: string) => {
            const segments = path.split("/").filter(Boolean);
            return segments[segments.length - 1];
        };

        return getLast(currentPath) === getLast(href);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-80">
                            <Image className="h-8 w-auto" src="/images/logos/logo.svg" alt="Logo" width={236} height={60} priority />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <DesktopSection navigation={navigation} isCurrentPath={isCurrentPath} userNavigation={userNavigation} handleSignOut={handleSignOut} />

                    {/* Mobile User Section */}
                    <MobileSection navigation={navigation} isCurrentPath={isCurrentPath} userNavigation={userNavigation}
                        handleUserAction={handleUserAction} setIsOpen={setIsOpen} isOpen={isOpen} />
                </div>
            </div>
        </nav>
    )
}
