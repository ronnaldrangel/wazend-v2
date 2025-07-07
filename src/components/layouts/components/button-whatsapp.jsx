"use client";

import { useEffect, useState } from "react";
import { data_app_config } from "@/config/config";
import { BsWhatsapp } from "react-icons/bs";
import { useTranslations } from "next-intl";


export default function ButtonWhatsapp() {
    const [whatsAppUrl, setWhatsAppUrl] = useState("");
    const t = useTranslations('Dashboard.Layout');

    useEffect(() => {
        const phoneNumber = data_app_config.whatsapp_number;
        if (!phoneNumber) return;

        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);

        const message = encodeURIComponent(t("WhatsAppMessage"));
        const baseUrl = isMobile
            ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`
            : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

        setWhatsAppUrl(baseUrl);
    }, []);

    if (!whatsAppUrl) return null;

    return (
        <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#23cc5b] text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform hover:bg-[#1D9F76]"
        >
            <BsWhatsapp className="h-10 w-10"/>
        </a>
    );
}
