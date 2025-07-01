import { signIn } from 'next-auth/react';
import { api_back } from "@/lib/api/api";

interface propsData {
    email: string;
    password: string;
}

export const checkUserConfirmation = async (email: string) => {
    try {
        const res = await api_back.get(
            `/api/users`,
            {
                params: { 'filters[email][$eq]': email },
            }
        );
        const data = res.data;
        return data.length > 0 ? { exists: true, confirmed: data[0].confirmed } : { exists: false };
    } catch {
        return { exists: false };
    }
};

export const submitFormData = async (propsData: propsData) => {
    const { email, password } = propsData;
    const result = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
    });
    return result
};