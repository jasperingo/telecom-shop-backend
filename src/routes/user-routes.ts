import express from 'express';
import UserController from '../controllers/user-controller';
import UserCreateValidatorMiddleware from '../middlewares/validators/user/user-create-validator-middleware';

const UserRoutes = express.Router();

UserRoutes.post(
  '', 
  UserCreateValidatorMiddleware,
  UserController.create.bind(UserController)
);

export default UserRoutes;
