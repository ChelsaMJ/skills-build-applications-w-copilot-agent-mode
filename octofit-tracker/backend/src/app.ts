import cors from 'cors';
import express from 'express';
import apiRouter from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);
app.use((_request, response) => {
  response.status(404).json({ error: 'Not found' });
});

export default app;
