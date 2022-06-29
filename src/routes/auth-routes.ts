import express from 'express';
import AuthController from '../controllers/auth-controller';
import PasswordAuthMiddleware from '../middlewares/auth/password-auth-middleware';
import ForgotPasswordValidatorMiddleware from '../middlewares/validators/auth/forgot-password-validator-middleware';
import ResetPasswordValidatorMiddleware from '../middlewares/validators/auth/reset-password-validator-middleware';

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

AuthRouter.post(
  '/reset-password',
  ResetPasswordValidatorMiddleware,
  AuthController.resetPassword.bind(AuthController)
);

export default AuthRouter;
