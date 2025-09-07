// Minimal env type declarations to avoid requiring 'vite/client' during tsc build
// on environments that skip devDependencies (e.g., Render with NODE_ENV=production)

interface ImportMetaEnv {
  readonly VITE_MAGPIE_PUBLISHABLE_KEY: string
  readonly VITE_MAGPIE_SECRET_KEY: string
  readonly VITE_APP_URL: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
