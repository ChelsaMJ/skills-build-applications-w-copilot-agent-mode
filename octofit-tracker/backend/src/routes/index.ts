import { Router } from 'express';
import activitiesRouter from './activities';
import leaderboardRouter from './leaderboard';
import healthRouter from './health';
import teamsRouter from './teams';
import usersRouter from './users';
import workoutsRouter from './workouts';

const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/teams', teamsRouter);
apiRouter.use('/activities', activitiesRouter);
apiRouter.use('/leaderboard', leaderboardRouter);
apiRouter.use('/workouts', workoutsRouter);

export default apiRouter;
