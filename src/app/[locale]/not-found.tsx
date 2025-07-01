'use client';
//import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
    //const t = useTranslations('errors');

    return (
        <div className="text-center mt-10">
            <h1 className="text-3xl font-bold">Pagina no encontrada</h1>
            <p>Sn descripcion</p>
            <Link href="/" className="text-blue-600 underline">
                NOT FOUND
            </Link>
        </div>
    );
}
