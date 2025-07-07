"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

export default function Clock() {
    const [time, setTime] = useState<Date | null>(null);
    const locale = useLocale(); 

    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time) return null;

    const formattedDate = time.toLocaleDateString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const formattedTime = time.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    return (
        <div className="text-right text-gray-600">
            <p className="text-sm">{formattedDate}</p>
            <p className="font-mono text-lg font-semibold">{formattedTime}</p>
        </div>
    );
}
