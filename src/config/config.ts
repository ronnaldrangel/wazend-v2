
// INFORMATION API BACKEND
export const backend_config = {
    backend_url: process.env.NEXT_PUBLIC_BACKEND_URL,
    api_token: process.env.NEXT_PUBLIC_API_TOKEN
}

// AUTHENTICACION NEXTJS
export const auth_config_next = {
    auth_secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
    auth_url: process.env.NEXT_PUBLIC_NEXT_AUTH_URL
}

//AUTHENTICACION GOOGLE
export const auth_config_google = {
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
}

//AUTHENTICACION GITHUB
export const auth_config_github = {
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET
}

//WEBHOOKS N8N
export const webhooks_n8n = {
    link_n8n: process.env.NEXT_PUBLIC_LINK_N8N,
    update_group: process.env.NEXT_PUBLIC_UPDATE_GROUP,
    create_instance: process.env.NEXT_PUBLIC_CREATE_INSTANCE,
    delete_instance: process.env.NEXT_PUBLIC_DELETE_INSTANCE,
    create_trial: process.env.NEXT_PUBLIC_CREATE_TRIAL,
    delete_trial: process.env.NEXT_PUBLIC_DELETE_TRIAL,
    register: process.env.NEXT_PUBLIC_REGISTER
}

//WAZEND
export const wazend_config = {
    api_key: process.env.NEXT_PUBLIC_WAZEND_API_KEY
}

//SENTRY
export const sentry_config = {
    auth_token: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN
}

//WOOCOMMERCE
export const woocommerce_config = {
    wc_store_url: process.env.NEXT_PUBLIC_WC_STORE_URL,
    wc_consumer_key: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
    wc_consumer_secret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET
}

//AFILIATEWP
export const afiliatewp_config = {
    af_public_key: process.env.NEXT_PUBLIC_AF_PUBLIC_KEY,
    af_token_key: process.env.NEXT_PUBLIC_AF_TOKEN_KEY
}

// DATA APP CONFIG

export const data_app_config = {
    app_name: process.env.NEXT_PUBLIC_APP_NAME,
    url: process.env.NEXT_PUBLIC_URL,
    whatsapp_number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    //logo: process.env.NEXT_PUBLIC_LOGO,
    //icon: process.env.NEXT_PUBLIC_ICON,
    //auth_bg: process.env.NEXT_PUBLIC_AUTH_BG
}

// APY KEYS OF CLOUDFLARE
export const clouflare_config = {
    siteKey: process.env.NEXT_PUBLIC_SITE_KEY_CLOUDFLARE,
    secretKey: process.env.NEXT_PUBLIC_SECRET_KEY_CLOUDFLARE
}
