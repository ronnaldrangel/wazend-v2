"use client";

import { useState } from 'react';
//import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Spin from '@/components/loaders/loader-spin';
import Modal from '@/components/loaders/loader-modal';
import { data_app_config } from '@/config/config';
import axios from 'axios';

interface CheckoutButtonProps {
    buttonText?: string;
    redirectUrl?: string;
}

const CheckoutButton = ({ buttonText = 'Ir al panel de facturación', redirectUrl = '/my-account/'}: CheckoutButtonProps) => {
    //const { data: session } = useSession();
    const email = /*session?.user?.email ||*/ 'joseluisjlgd123@gmail.com';
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleCheckout = async () => {
        if (!email) {
            toast.error('Debes iniciar sesión para continuar.');
            return;
        }

        setLoading(true);
        setShowModal(true);

        try {
            const response = await axios.post(
                `${data_app_config.url}/wp-json/magic-login/v1/token`,
                {
                    user: email,
                    send: false,
                    redirect_to: `${data_app_config.url || 'https://wazend.net'}${redirectUrl}`,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Basic ZGV2b3A6WXp3dyBBaXJtIE9NdTIgNjFZRyBNYzAzIFdGS1Y=',
                    },
                }
            );

            const data = response.data;

            if (data?.link) {
                window.location.href = data.link;
            } else {
                toast.error('No tienes compras recientes.');
            }
        } catch (err) {
            console.error('Error al realizar el post:', err);
            toast.error('No tienes compras recientes.');
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    return (
        <>
            <Button
                onClick={handleCheckout}
                disabled={loading}
                className="inline-flex items-center justify-center md:mx-28 text-white text-sm font-medium transition-all duration-200 #1D9F76 bg-[#1D9F76] hover:bg-[#157a5b] rounded-lg shadow-md"
            >
                {loading ? <Spin /> : buttonText}
            </Button>

            {showModal && <Modal message="Redirigiendo..." />}
        </>
    );
};

export default CheckoutButton;
