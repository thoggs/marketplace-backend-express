import { Router } from 'express';
import userController from "../app/http/controllers/userController";

const userRouter = Router();

userRouter.get('/', userController.index);
userRouter.post('/', userController.create);
userRouter.get('/:id', userController.show);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.destroy);

export default userRouter;
