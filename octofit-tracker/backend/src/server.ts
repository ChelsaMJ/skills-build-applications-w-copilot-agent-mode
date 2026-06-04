import 'dotenv/config';
import app from './app';
import { getBaseUrl } from './config/base-url';
import { connectDatabase } from './config/database';

const port = Number(process.env.PORT ?? 8000);

async function startServer(): Promise<void> {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`OctoFit backend listening at ${getBaseUrl(port)}`);
  });
}

startServer().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Failed to start backend: ${message}`);
  process.exit(1);
});
