/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_PLAUSIBLE_DOMAIN?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
