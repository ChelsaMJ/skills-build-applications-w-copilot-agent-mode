import { Router } from 'express';
import Workout from '../models/workout.model';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_request, response, next) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    response.json(workouts);
  } catch (error) {
    next(error);
  }
});

workoutsRouter.get('/:id', async (request, response, next) => {
  try {
    const workout = await Workout.findById(request.params.id);

    if (!workout) {
      response.status(404).json({ error: 'Workout not found' });
      return;
    }

    response.json(workout);
  } catch (error) {
    next(error);
  }
});

workoutsRouter.post('/', async (request, response, next) => {
  try {
    const workout = await Workout.create(request.body);
    response.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});

export default workoutsRouter;