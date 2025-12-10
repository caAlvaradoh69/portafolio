interface ImportMetaEnv {
    readonly VITE_URL_INTERMEDIARIO: string;
    // agrega aquí todas tus variables VITE_
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}