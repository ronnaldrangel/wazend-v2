"use client"

import { CheckCircleIcon } from '@heroicons/react/20/solid';
import EmailConfirmationLoginForm from "@/components/auth/email-confirmation/email-confirmation-login"
import { useTranslations } from 'next-intl';

export default function EmailConfirmationLogin() {

    const t = useTranslations('Auth.EmailConfirmation');

    return (
        <div>
            <div className="mt-8 flex flex-col">
                <CheckCircleIcon
                    className="h-auto w-10 text-green-400 dark:text-green-500 mb-4"
                />
                <p className="text-base font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                    {t("title")}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t("Text")}
                </p>
            </div>

            <div className="mt-6 border-t pt-6 border-gray-200">
                <p className="text-balance text-base font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                    {t("NoReceive")}
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                    {t("EmailNoReceive")}
                </p>

                <EmailConfirmationLoginForm />
            </div>
        </div>
    )
}
