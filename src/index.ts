import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api';
import healthRouter from './routes/health';
import authRouter from './routes/auth';
import responseFormatter from "./app/http/middleware/responseFormatter";
import errorHandler from "./app/http/middleware/errorHandler";
import passport from "./config/passport";
import authenticateJwt from "./app/http/middleware/auth";
import App from "./bootstrap/app";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use(responseFormatter);
app.use('/api', authenticateJwt, apiRouter);
app.use('/auth', authRouter);
app.use('/', healthRouter);
app.use(errorHandler);

const appBootstrap = new App(app, port);

appBootstrap.initialize().then();