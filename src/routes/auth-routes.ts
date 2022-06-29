import express from 'express';
import AuthController from '../controllers/auth-controller';
import PasswordAuthMiddleware from '../middlewares/auth/password-auth-middleware';
import ForgotPasswordValidatorMiddleware from '../middlewares/validators/auth/forgot-password-validator-middleware';

const AuthRouter = express.Router();

AuthRouter.post(
  '',
  PasswordAuthMiddleware,
  AuthController.create.bind(AuthController)
);

AuthRouter.post(
  '/forgot-password',
  ForgotPasswordValidatorMiddleware,
  AuthController.forgotPassword.bind(AuthController)
);

export default AuthRouter;
