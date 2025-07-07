"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

export default function Bible() {
    const locale = useLocale();
    const [verse, setVerse] = useState<{ verse: string; reference: string } | null>(null);

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`/samples/book/${locale}.json`);
            const data = await res.json();
            const random = data[Math.floor(Math.random() * data.length)];
            setVerse(random);
        };

        load();
    }, [locale]);

    if (!verse) return null;

    return (
        <div className="text-left font-sans text-gray-600">
            <p className="text-xs italic">
                {verse.verse} - <span className="font-bold">{verse.reference}</span>
            </p>
        </div>
    );
}
