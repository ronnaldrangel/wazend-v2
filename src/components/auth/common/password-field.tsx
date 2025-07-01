"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { cn } from "@/lib/utils"

interface PasswordFieldProps {
    id: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    minLength?: number
    required?: boolean
    error?: string
    className?: string
}

export default function PasswordField({
    id,
    name,
    value,
    onChange,
    placeholder = "••••••••",
    minLength,
    required,
    error,
    className,
}: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div>
            <div className={cn("relative", className)}>
                <Input
                    id={id}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    minLength={minLength}
                    required={required}
                    className="pr-10"
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </Button>
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    )
}
