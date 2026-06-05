# OctoFit Frontend

## Environment setup

Define `VITE_CODESPACE_NAME` in `.env.local` when running in GitHub Codespaces.

Example `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds API URLs as:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app safely falls back to:

```text
http://localhost:8000/api/[component]/
```

This prevents invalid URLs like `https://undefined-8000.app.github.dev/...`.

## Run locally

```bash
npm run dev --prefix octofit-tracker/frontend
```

Vite serves the presentation tier on port `5173`.
