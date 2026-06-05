import { Router } from 'express';
import User from '../models/user.model';

const usersRouter = Router();

usersRouter.get('/', async (_request, response, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    response.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id);

    if (!user) {
      response.status(404).json({ error: 'User not found' });
      return;
    }

    response.json(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', async (request, response, next) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;