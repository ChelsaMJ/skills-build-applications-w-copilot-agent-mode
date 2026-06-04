import { Router } from 'express';
import { getBaseUrl } from '../config/base-url';

const healthRouter = Router();
const port = Number(process.env.PORT ?? 8000);

healthRouter.get('/', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    baseUrl: getBaseUrl(port),
    port,
  });
});

export default healthRouter;
