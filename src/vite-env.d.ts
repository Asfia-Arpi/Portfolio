/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional: a form service endpoint (e.g. Formspree) that makes the contact form really send. */
  readonly VITE_FORM_ENDPOINT?: string;
}
