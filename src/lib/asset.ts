/** Resolves a file in /public so it works locally and on sub-path hosting (e.g. GitHub Pages). */
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
