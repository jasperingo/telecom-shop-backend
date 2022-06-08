import express from 'express';
import UserCreateValidatorMiddleware from '../middlewares/validators/user/user-create-validator-middleware';
import UserController from '../controllers/user-controller';

const UserRoutes = express.Router();

UserRoutes.post(
  '', 
  UserCreateValidatorMiddleware,
  UserController.create.bind(UserController)
);


export default UserRoutes;
