import 'dotenv/config';
import app from './app';
import { API_PORT } from './config/base-url';
import { connectDatabase } from './config/database';

const port = API_PORT;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

async function startServer(): Promise<void> {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`OctoFit backend listening at ${baseUrl}`);
  });
}

startServer().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Failed to start backend: ${message}`);
  process.exit(1);
});
