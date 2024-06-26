import { Router } from 'express';
import userRouter from "./users";
import productRouter from "./product";

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/products', productRouter);

export default apiRouter;
