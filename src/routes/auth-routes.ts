import express from 'express';
import AuthController from '../controllers/auth-controller';
import PasswordAuthMiddleware from '../middlewares/auth/password-auth-middleware';

const AuthRouter = express.Router();

AuthRouter.post(
  '',
  PasswordAuthMiddleware,
  AuthController.create.bind(AuthController)
);

export default AuthRouter;
