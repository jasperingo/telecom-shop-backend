import express from 'express';
import UserController from '../controllers/user-controller';
import JwtAuthMiddleware from '../middlewares/auth/jwt-auth-middleware';
import UserFetchMiddleware from '../middlewares/fetch/user-fetch-middleware';
import UserUpdatePermissionMiddleware from '../middlewares/permissions/user/user-update-permission-middleware';
import UserCreateValidatorMiddleware from '../middlewares/validators/user/user-create-validator-middleware';

const UserRoutes = express.Router();

UserRoutes.post(
  '', 
  UserCreateValidatorMiddleware,
  UserController.create.bind(UserController)
);

UserRoutes.put(
  '/:id', 
  UserFetchMiddleware,
  JwtAuthMiddleware,
  UserUpdatePermissionMiddleware,
  UserController.update.bind(UserController)
);

export default UserRoutes;
