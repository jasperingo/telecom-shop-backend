import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import httpErrors from 'http-errors';
import passport from 'passport';
import ErrorHandler from './errors/error-handler';
import ApiRoutes from './routes/api-routes';
import { JwtAuth, PasswordAuth } from './configs/auth-config';

passport.use(JwtAuth);
passport.use(PasswordAuth);

const app = express();

app.use(cors({ preflightContinue: true }));
app.use(logger('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.data = {} as any;
  next();
});

app.get('/', (req, res) => {
  res.send('<h1>Welcome to royaltysubs REST API.</H1>');
});

app.use('/api', ApiRoutes);

app.use((req, res, next) => {
  next(new httpErrors.NotFound('Resource could not be found'));
});

app.use(ErrorHandler);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running at ${process.env.SERVER_HOST}:${ process.env.SERVER_PORT }`);
});
