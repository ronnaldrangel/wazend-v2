import axios from 'axios';
import { backend_config, webhooks_n8n } from "@/config/config";

const api_back = axios.create({
    baseURL: backend_config.backend_url,
});

const api_n8n = axios.create({
    baseURL: webhooks_n8n.link_n8n,
});

api_back.interceptors.request.use((config) => {
    if (typeof window !== 'undefined' && config.headers) {
        const token = backend_config.api_token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export {
    api_back,
    api_n8n
}
