"use client"


import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import LogoGravatar from "@/components/avatar/avatar"
import { Input } from "@/components/ui/input"
//import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { api_back } from "@/lib/api/api"
import OrderSkeleton from "@/components/loaders/skeleton"
import Alerta from "@/components/alerts/alert"


export default function UserInformation() {

    //const { data: session, status } = useSession()
    const [data, setData] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        provider: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
    const [formDataProfile, setFormDataProfile] = useState({
        name: '',
        phone: '',
    });

    /*useEffect(() => {
        const fetchData = async () => {
            try {
                if (status === 'authenticated' && session?.jwt) { //corregir esto
                    const response = await api_back.get("/api/users/me");
                    setData(response.data);
                    setFormDataProfile({
                        name: response.data.name || '',
                        phone: response.data.phone || '',
                    });
                }
            } catch (err: unknown) {
                setError('Error al obtener datos: ' + (err instanceof Error ? err.message : String(err)));
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [status, session]);*/

    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmittingProfile(true);
        try {
            const response = await api_back.put(`/api/users/${data?.id}`, {
                name: formDataProfile.name,
                phone: formDataProfile.phone,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success('Perfil actualizado con éxito');
            setData(response.data);
        } catch (err: unknown) {
            const error = err as Error;
            toast.error(error.message || 'Error al actualizar perfil');
        } finally {
            setIsSubmittingProfile(false);
        }
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                    <LogoGravatar
                        email={data.email || 'joseluisjlgd123@gmail.com'}
                        className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"
                    />
                    <div>
                        <p className="text-base font-bold text-gray-800">
                            {data.name || 'Jose Luis Gutierrez Diaz'}
                        </p>
                        <p className="text-gray-800 text-sm">
                            {data.email || 'joseluisjlgd123@gmail.com'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <p className="text-lg font-semibold text-black mb-2">Información del perfil</p>
                <p className="text-gray-500 text-sm mb-8">
                    Actualice la información del perfil y la dirección de correo electrónico de su cuenta.
                </p>

                <form className="space-y-6" onSubmit={handleProfileUpdate}>
                    <div className="w-full space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-black">
                                Nombre
                            </label>
                            <Input
                                id="name"
                                name="name"
                                value={formDataProfile.name}
                                onChange={(e) => setFormDataProfile({ ...formDataProfile, name: e.target.value })}
                                placeholder="Ingrese su nombre"
                                className="mt-2 block w-full rounded-md border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-black">
                                Teléfono
                            </label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                value={formDataProfile.phone}
                                onChange={(e) => {
                                    const regex = /^[0-9\b]+$/;
                                    if (e.target.value === '' || regex.test(e.target.value)) {
                                        setFormDataProfile({ ...formDataProfile, phone: e.target.value });
                                    }
                                }}
                                placeholder="Ingrese su teléfono"
                                className="mt-2 block w-full rounded-md border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isSubmittingProfile}>
                                {isSubmittingProfile ? 'Guardando...' : 'Guardar cambios'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
