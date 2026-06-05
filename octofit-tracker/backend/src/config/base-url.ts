export const API_PORT = 8000;

export function getBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-${API_PORT}.app.github.dev`
    : `http://localhost:${API_PORT}`;
}
