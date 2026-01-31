/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly MONGODB_URI: string;
  readonly MONGODB_DB?: string;
  readonly GEMINI_API_KEY: string;
  readonly GEMINI_MODEL?: string;
  readonly VUDY_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}