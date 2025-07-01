'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="text-center mt-10">
            <h2 className="text-2xl">¡Algo salió mal!</h2>
            <button
                onClick={reset}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Reintentar
            </button>
        </div>
    );
}
