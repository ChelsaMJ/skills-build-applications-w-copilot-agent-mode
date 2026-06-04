import { Router } from 'express';
import Leaderboard from '../models/leaderboard.model';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response, next) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1, score: -1 });
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

leaderboardRouter.post('/', async (request, response, next) => {
  try {
    const entry = await Leaderboard.create(request.body);
    response.status(201).json(entry);
  } catch (error) {
    next(error);
  }
});

export default leaderboardRouter;