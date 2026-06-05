import { Router } from 'express';
import Activity from '../models/activity.model';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response, next) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    response.json(activities);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.get('/:id', async (request, response, next) => {
  try {
    const activity = await Activity.findById(request.params.id);

    if (!activity) {
      response.status(404).json({ error: 'Activity not found' });
      return;
    }

    response.json(activity);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.post('/', async (request, response, next) => {
  try {
    const activity = await Activity.create(request.body);
    response.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

export default activitiesRouter;