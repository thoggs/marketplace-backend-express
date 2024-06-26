import { Router } from 'express';
import healthController from "../app/http/controllers/healthController";

const healthRouter = Router();

healthRouter.get('/health', healthController.healthCheck);

export default healthRouter;
