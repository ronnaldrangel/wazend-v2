
import useSWR from 'swr';
import { api_back } from '@/lib/api/api';

const fetcher = async (url: string) => {
    const res = await api_back.get(url, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.status !== 200) {
        throw new Error('No se encontraron datos válidos');
    }

    const data = res.data;

    if (data.data && Array.isArray(data.data)) {
        return data.data;  
    } else {
        throw new Error('No se encontraron datos válidos');
    }
};

export function useStrapiData(endpoint: string) {
    const { data, error } = useSWR(
        `/api/${endpoint}`,
        fetcher
    );

    return {
        data,
        error,
        isLoading: !error && !data,
    };
}