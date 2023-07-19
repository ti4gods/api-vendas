import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import isAutenticated from '../../../shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UsersAvatarController';

const usersRouter = Router();
const userController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

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

usersRouter.patch(
  '/avatar',
  isAutenticated,
  upload.single('avatar'),
  usersAvatarController.update,
)

export default usersRouter;