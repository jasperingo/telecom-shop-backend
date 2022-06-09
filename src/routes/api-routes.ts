import express from 'express';
import AuthRouter from './auth-routes';
import UserRoutes from './user-routes';

const ApiRoutes = express.Router();

ApiRoutes.use('/users', UserRoutes);

ApiRoutes.use('/auth', AuthRouter);

export default ApiRoutes;
