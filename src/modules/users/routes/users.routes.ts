import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAutenticated from '../../../shared/http/middlewares/isAuthenticated';

const usersRouter = Router();
const userController = new UsersController();

usersRouter.get('/', isAutenticated, userController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),

  userController.create,
);

export default usersRouter;