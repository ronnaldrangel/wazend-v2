

import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import LogoGravatar from "@/components/avatar/avatar"
import Link from "next/link"
import { ExternalLink, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"
// import { useSession } from "next-auth/react"

interface UserNavigationItem {
    name: string
    href: string
    external?: boolean
    signOut?: boolean
}

interface NavigationItem {
    name: string
    href: string
    trial?: boolean
    external?: boolean
}

interface Props {
    navigation: NavigationItem[]
    isCurrentPath: (href: string) => boolean
    userNavigation: UserNavigationItem[]
    handleUserAction: (item: UserNavigationItem) => void
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export default function MobileSection(props: Props) {

    const { navigation, isCurrentPath, userNavigation, handleUserAction, isOpen, setIsOpen } = props

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Abrir menú principal</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 p-0">
                        <SheetHeader className="px-6 py-4 border-b border-gray-100">
                            <SheetTitle className="flex items-center justify-between">
                                <Image className="h-8 w-auto" src="/images/logos/logo.svg" alt="Logo" width={236} height={60} />
                            </SheetTitle>
                        </SheetHeader>

                        {/* Mobile Navigation Links */}
                        <div className="px-6 pb-6 pt-3">
                            <div className="space-y-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        target={item.external ? "_blank" : undefined}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200",
                                            isCurrentPath(item.href)
                                                ? "bg-primary/10 text-primary border-l-4 border-primary"
                                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                                        )}
                                    >
                                        {item.trial ? (
                                            <span className="bg-gradient-to-r from-primary to-primary/80 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                                                {item.name}
                                            </span>
                                        ) : (
                                            item.name
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Mobile User Section */}
                        <Separator />
                        <div className="px-6 pb-6">
                            <div className="flex items-center px-4 py-3 mb-4 bg-gray-50 rounded-lg">
                                <LogoGravatar
                                    email={/*session.user?.email || */ "joseluisjlgd123@gmail.com"}
                                    size={48}
                                    className="h-12 w-12 rounded-full border-2 border-white shadow-sm"
                                />
                                <div className="ml-3">
                                    <div className="text-base font-semibold text-gray-900">{/* session.user?.name || */ "Jose Luis Gutierrez"}</div>
                                    <div className="text-sm text-gray-500 truncate">{/*session.user?.email || */ "joseluisjlgd123@gmail.com"}</div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                {userNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        target={item.external ? "_blank" : undefined}
                                        onClick={(e) => {
                                            if (item.signOut) {
                                                e.preventDefault()
                                                handleUserAction(item)
                                            } else {
                                                setIsOpen(false)
                                            }
                                        }}
                                        className={cn(
                                            "flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200",
                                            item.signOut
                                                ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                                                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                                        )}
                                    >
                                        {item.name}
                                        {item.external && <ExternalLink className="h-4 w-4 ml-auto opacity-60" />}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}
