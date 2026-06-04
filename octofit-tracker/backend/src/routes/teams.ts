import { Router } from 'express';
import Team from '../models/team.model';

const teamsRouter = Router();

teamsRouter.get('/', async (_request, response, next) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    response.json(teams);
  } catch (error) {
    next(error);
  }
});

teamsRouter.get('/:id', async (request, response, next) => {
  try {
    const team = await Team.findById(request.params.id);

    if (!team) {
      response.status(404).json({ error: 'Team not found' });
      return;
    }

    response.json(team);
  } catch (error) {
    next(error);
  }
});

teamsRouter.post('/', async (request, response, next) => {
  try {
    const team = await Team.create(request.body);
    response.status(201).json(team);
  } catch (error) {
    next(error);
  }
});

export default teamsRouter;