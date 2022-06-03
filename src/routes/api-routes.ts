import express from 'express';
import UserRoutes from './user-routes';

const ApiRoutes = express.Router();

ApiRoutes.use('/users', UserRoutes);


export default ApiRoutes;
