"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { api_back } from "@/lib/api/api"

export default function ChangePassword() {

    const [formPasswords, setFormPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

    const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formPasswords.newPassword !== formPasswords.confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }
        setIsSubmittingPassword(true);
        try {
            const response = await api_back.post(`/api/auth/change-password`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword: formPasswords.currentPassword,
                    password: formPasswords.newPassword,
                    passwordConfirmation: formPasswords.confirmPassword
                })
            });

            if (response.status === 200) {
                toast.success('Contraseña actualizada con éxito');
                const result = await response.data;
                console.log(result);
                setFormPasswords({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
            }
            else{
                toast.error('Error al actualizar la contraseña');
            }

        } catch (err) {
            toast.error('Error al actualizar la contraseña');
        } finally {
            setIsSubmittingPassword(false);
        }
    };

    return (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <p className="text-lg font-semibold text-black mb-2">Actualizar contraseña</p>
            <p className="text-gray-500 text-sm mb-8">
                Asegúrese de que su cuenta utilice una contraseña larga y aleatoria para mantenerla segura.
            </p>

            <form className="space-y-6" onSubmit={handlePasswordUpdate}>
                <div className="w-full space-y-6">
                    <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-black">
                            Contraseña actual
                        </label>
                        <Input
                            id="current-password"
                            name="currentPassword"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={formPasswords.currentPassword}
                            onChange={(e) => setFormPasswords({ ...formPasswords, currentPassword: e.target.value })}
                            placeholder="Ingresa tu contraseña actual"
                            className="mt-2 block w-full rounded-md border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                    </div>

                    <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-black">
                            Nueva contraseña
                        </label>
                        <Input
                            id="new-password"
                            name="newPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formPasswords.newPassword}
                            onChange={(e) => setFormPasswords({ ...formPasswords, newPassword: e.target.value })}
                            placeholder="Ingresa tu nueva contraseña"
                            className="mt-2 block w-full rounded-md border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-black">
                            Confirmar contraseña
                        </label>
                        <input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formPasswords.confirmPassword}
                            onChange={(e) => setFormPasswords({ ...formPasswords, confirmPassword: e.target.value })}
                            placeholder="Confirma tu nueva contraseña"
                            className="mt-2 block w-full rounded-md border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isSubmittingPassword}>
                            {isSubmittingPassword ? 'Guardando...' : 'Actualizar contraseña'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
