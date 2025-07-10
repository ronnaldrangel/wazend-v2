
import { api_back } from '@/lib/api/api';

export async function signIn({ email, password }: { email: string; password: string }) {
    const res = await api_back.post(
        `/api/auth/local`,
        {
            identifier: email,
            password,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return res.data;
}