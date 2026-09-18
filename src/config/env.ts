const requiredEnv = (name: string, value: string | undefined): string => {
    if (!value?.trim()) {
        throw new Error(`Variável de ambiente obrigatória não definida: ${name}`);
    }

    return value;
};

export const env = {
    API_URL: requiredEnv('VITE_API_URL', import.meta.env.VITE_API_URL),
    GOOGLE_CLIENT_ID: requiredEnv(
        'VITE_GOOGLE_CLIENT_ID',
        import.meta.env.VITE_GOOGLE_CLIENT_ID,
    ),
};
