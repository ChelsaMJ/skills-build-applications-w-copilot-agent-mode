import 'dotenv/config';
import app from './app';
import { API_PORT, getBaseUrl } from './config/base-url';
import { connectDatabase } from './config/database';

const port = API_PORT;

async function startServer(): Promise<void> {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`OctoFit backend listening at ${getBaseUrl()}`);
  });
}

startServer().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Failed to start backend: ${message}`);
  process.exit(1);
});
