/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHOW_DESIGN_SYSTEM?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
