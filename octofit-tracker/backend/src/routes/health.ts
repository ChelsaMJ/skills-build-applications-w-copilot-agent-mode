import { Router } from 'express';
import { API_PORT, getBaseUrl } from '../config/base-url';

const healthRouter = Router();
const port = API_PORT;

healthRouter.get('/', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    baseUrl: getBaseUrl(),
    port,
  });
});

export default healthRouter;
