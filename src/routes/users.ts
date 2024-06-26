import { Router } from 'express';
import userController from "../controllers/userController";

const usersRouter = Router();

usersRouter.get('/', userController.index);
usersRouter.post('/', userController.create);
usersRouter.get('/:id', userController.show);
usersRouter.put('/:id', userController.update);
usersRouter.delete('/:id', userController.destroy);

export default usersRouter;
