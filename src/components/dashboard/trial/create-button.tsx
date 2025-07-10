

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { api_n8n } from '@/lib/api/api'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import Spin from "@/components/loaders/loader-spin"
import { mutate } from "swr"
import { backend_config } from "@/config/config"

const COOLDOWN_DURATION = 1000 * 60 * 10;


export default function CreateButton({ onSuccess }: { onSuccess?: () => void }) {

    const { data: session } = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        const lastAttemptTime = localStorage.getItem('trialCreationAttempt');

        if (lastAttemptTime) {
            const elapsedTime = Date.now() - parseInt(lastAttemptTime, 10);

            if (elapsedTime < COOLDOWN_DURATION) {
                const remainingTime = Math.ceil((COOLDOWN_DURATION - elapsedTime) / 1000);
                setIsDisabled(true);
                setCountdown(remainingTime);

                const timer = setInterval(() => {
                    setCountdown(prev => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            setIsDisabled(false);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                return () => clearInterval(timer);
            } else {
                localStorage.removeItem('trialCreationAttempt');
            }
        }
    }, []);

    const formatCountdown = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCreateInstance = async () => {
        if (isDisabled) return;

        if (!session?.user?.email) {
            toast.error("No se pudo obtener su correo electrónico. Inicie sesión nuevamente.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await api_n8n.post("/create-trial-instance", {
                email: session.user.email,
                userId: session.user.name || "ID no disponible",
            });

            if (response.status === 200) {
                localStorage.setItem("trialCreationAttempt", Date.now().toString());
                setIsDisabled(true);
                setCountdown(COOLDOWN_DURATION / 1000);

                toast.success("Instancia creada correctamente");

                await mutate(`${backend_config.backend_url}/api/users/me?populate=freetrials`)

                if (typeof onSuccess === "function") {
                    onSuccess();
                }
            }
        } catch (error) {
            console.error('Error de conexión:', error);

            toast.error('Error de conexión', {
                description: 'Compruebe su conexión a internet o intentelo mas tarde',
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="flex flex-col">
            <Button
                type="button"
                onClick={handleCreateInstance}
                disabled={isSubmitting || isDisabled}
                aria-label="Crear instancia de prueba"
            >
                {isSubmitting ? (
                    <>
                        <Spin />
                        Cargando...
                    </>
                ) : isDisabled ? (
                    <>Espere {formatCountdown(countdown)}</>
                ) : (
                    <>Crear instancia de prueba</>
                )}
            </Button>

            {isDisabled && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                    Solo puede crear una instancia cada 10 minutos.
                </p>
            )}
        </div>
    )
}
