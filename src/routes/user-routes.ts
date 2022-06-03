import express from 'express';
import UserController from '../controllers/user-controller';

const UserRoutes = express.Router();

UserRoutes.get('/create', UserController.create.bind(UserController));


export default UserRoutes;
