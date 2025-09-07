/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAGPIE_PUBLISHABLE_KEY: string
  readonly VITE_MAGPIE_SECRET_KEY: string
  readonly VITE_APP_URL: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
