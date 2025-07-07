
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import LogoGravatar from "../components/avatar"
import Link from 'next/link'

//import { useSession } from "next-auth/react"

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
    handleSignOut: () => void
}

export default function DesktopSection(props: Props) {

    const { navigation, isCurrentPath, userNavigation, handleSignOut } = props

    return (
        <>
            <div className="hidden md:flex md:items-center md:space-x-1">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        className={cn(
                            "relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg group",
                            isCurrentPath(item.href)
                                ? "text-primary bg-primary/5"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                        )}
                    >
                        {item.trial ? (
                            <span className="bg-gradient-to-r from-[#1D9F76] via-gray-600 to-[#168a5b] text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                                {item.name}
                            </span>
                        ) : (
                            <>
                                {item.name}
                                {isCurrentPath(item.href) && (
                                    <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-[#1D9F76]"  />
                                )}
                            </>
                        )}
                    </Link>
                ))}
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:flex md:items-center md:space-x-4">
                <div className="hidden lg:flex lg:items-center lg:space-x-3">
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{ /* session.user?.name || */ "Jose Luis Gutierrez"}</p>
                        <p className="text-xs text-gray-500">{/*session.user?.email || */ "joseluisjlgd123@gmail.com"}</p>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative h-10 w-10 rounded-full p-0 ring-2 ring-transparent hover:ring-primary/20 transition-all duration-200"
                        >
                            <LogoGravatar
                                email={/*session.user?.email || */ "joseluisjlgd123@gmail.com"}
                                size={40}
                                className="rounded-full border-2 border-white shadow-sm"
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-2" align="end">
                        <div className="px-2 py-1.5 mb-1">
                            <p className="text-sm font-medium text-gray-900">{/* session.user?.name || */ "Jose Luis Gutierrez"}</p>
                            <p className="text-xs text-gray-500 truncate">{/*session.user?.email || */ "joseluisjlgd123@gmail.com"}</p>
                        </div>
                        <DropdownMenuSeparator />
                        {userNavigation.map((item, index) => (
                            <div key={item.name}>
                                {index === userNavigation.length - 1 && <DropdownMenuSeparator />}
                                <DropdownMenuItem asChild>
                                    <Link
                                        href={item.href}
                                        target={item.external ? "_blank" : undefined}
                                        onClick={(e) => {
                                            if (item.signOut) {
                                                e.preventDefault()
                                                handleSignOut()
                                            }
                                        }}
                                        className={cn(
                                            "flex items-center cursor-pointer rounded-md px-2 py-1.5 text-sm transition-colors",
                                            item.signOut
                                                ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                                                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                                        )}
                                    >
                                        {item.name}
                                        {item.external && <ExternalLink className="h-3.5 w-3.5 ml-auto opacity-60" />}
                                    </Link>
                                </DropdownMenuItem>
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}
