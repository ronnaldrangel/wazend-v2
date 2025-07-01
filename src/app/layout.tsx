
import type { Metadata } from "next";
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from 'sonner'
import "@/styles/globals.css";
import { setRequestLocale } from 'next-intl/server';


export const metadata: Metadata = {
    title: "Wazend",
    description: "WhatsApp API para desarrolladores - Wazend",
    authors: { name: "Wazend" },
    keywords: [
        "Wazend",
        "Api WhatsApp",
        "WhatsApp Api",
        "Api desarrolladores",
    ],
    //metadataBase: new URL("https://app.wazend.net/login"),
    icons: {
        icon: "/favicon.ico",
    },
    alternates: {
        canonical: "/es",
        languages: {
            en: "/en",
            es: "/es",
            pt: "/pt",
        },
    },
    openGraph: {
        type: "website",
        url: "https://wazend.net",
        title: "Wazend",
        description: "WhatsApp API para desarrolladores - Wazend",
        images: [
            {
                url: "https://wazend.net/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "Wazend",
            },
        ],
        siteName: "Wazend",
    },
};

type Props = {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
};

export default async function RootLayout({ children, params }: Props) {

    const { locale } = await params;
    const messages = await getMessages()
    setRequestLocale(locale);

    return (
        <html lang={locale} suppressHydrationWarning={true} className={`antialiased`}>
            <body suppressHydrationWarning={true}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                    <Toaster richColors position="top-right" />
                </NextIntlClientProvider>
            </body>
        </html>
    )
}