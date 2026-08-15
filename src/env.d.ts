interface ImportMetaEnv {
    readonly SITE_BASE_URL?: string;
    readonly ATPROTO_DID?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
