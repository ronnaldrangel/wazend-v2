// pages/referral-program.js
import React from 'react';
import CheckoutButton from './check-button';

export default function ActiveProgram() {
    return (
        <section className="bg-white p-6 mb-6 flex justify-center">
            <div className="bg-white py-3 max-w-xl grid grid-cols-1 items-center justify-center">
                <h2 className="text-xl font-medium text-gray-800 mt-0 mb-4 text-center">
                    Tu enlace de afiliado
                </h2>
                <p className="text-sm text-gray-600 mb-5 text-center">
                    Necesitas activar el afiliado para obtener tu enlace de referencia único, que te permite invitar a nuevos usuarios y ganar recompensas.
                </p>

                <CheckoutButton
                    buttonText="Activar Afiliado"
                    redirectUrl="/affiliate-portal/"
                />
            </div>
        </section>
    );
}