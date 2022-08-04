import express from 'express';
import UserController from '../controllers/user-controller';
import JwtAuthMiddleware from '../middlewares/auth/jwt-auth-middleware';
import UserFetchMiddleware from '../middlewares/fetch/user-fetch-middleware';
import UserAdminUpdatePermissionMiddleware from '../middlewares/permissions/user/user-admin-update-permission-middleware';
import UserReadOnePermissionMiddleware from '../middlewares/permissions/user/user-read-one-permission-middleware';
import UserReadPermissionMiddleware from '../middlewares/permissions/user/user-read-permission-middleware';
import UserStatusUpdatePermissionMiddleware from '../middlewares/permissions/user/user-status-update-permission-middleware';
import UserReferralsReadPermissionMiddleware from '../middlewares/permissions/user/user-referrals-read-permission-middleware';
import UserTransactionsReadPermissionMiddleware from '../middlewares/permissions/user/user-transactions-read-permission-middleware';
import UserUpdatePermissionMiddleware from '../middlewares/permissions/user/user-update-permission-middleware';
import UserAdminUpdateValidatorMiddleware from '../middlewares/validators/user/user-admin-update-validation-middleware';
import UserCreateValidatorMiddleware from '../middlewares/validators/user/user-create-validator-middleware';
import UserPasswordUpdateValidatorMiddleware from '../middlewares/validators/user/user-password-update-validator-middleware';
import UserStatusUpdateValidatorMiddleware from '../middlewares/validators/user/user-status-update-validator-middleware';
import UserUpdateValidatorMiddleware from '../middlewares/validators/user/user-update-validator-middleware';
import UserEmailVerifiedUpdateValidatorMiddleware from '../middlewares/validators/user/user-email-verified-update-validation-middleware';

const UserRoutes = express.Router();

UserRoutes.post(
  '', 
  UserCreateValidatorMiddleware,
  UserController.create.bind(UserController)
);

UserRoutes.get(
  '', 
  JwtAuthMiddleware,
  UserReadPermissionMiddleware,
  UserController.read.bind(UserController)
);

UserRoutes.put(
  '/:id', 
  UserFetchMiddleware,
  JwtAuthMiddleware,
  UserUpdatePermissionMiddleware,
  UserUpdateValidatorMiddleware,
  UserController.update.bind(UserController)
);

UserRoutes.get(
  '/:id', 
  UserFetchMiddleware,
  JwtAuthMiddleware,
  UserReadOnePermissionMiddleware,
  UserController.readOne.bind(UserController)
);

UserRoutes.put(
  '/:id/password', 
  UserFetchMiddleware,
  JwtAuthMiddleware,
  UserUpdatePermissionMiddleware,
  UserPasswordUpdateValidatorMiddleware,
  UserController.updatePassword.bind(UserController)
);

UserRoutes.put(
  '/:id/status', 
  UserFetchMiddleware,
  JwtAuthMiddleware,
  UserStatusUpdatePermissionMiddleware,
  UserStatusUpdateValidatorMiddleware,
  UserController.updateStatus.bind(UserController)
);

UserRoutes.put(
  '/:id/email-verification-token', 
  UserFetchMiddleware,
  UserController.updateEmailVerificationToken.bind(UserController)
);

UserRoutes.put(
  '/:id/email-verified', 
  UserFetchMiddleware,
  UserEmailVerifiedUpdateValidatorMiddleware,
  UserController.updateEmailVerified.bind(UserController)
);

UserRoutes.put(
  '/:id/admin', 
  UserFetchMiddleware,
  JwtAuthMiddleware,
  UserAdminUpdatePermissionMiddleware,
  UserAdminUpdateValidatorMiddleware,
  UserController.updateAdmin.bind(UserController)
);

UserRoutes.get(
  '/:id/referrals', 
  UserFetchMiddleware,
  JwtAuthMiddleware,
  UserReferralsReadPermissionMiddleware,
  UserController.readReferrals.bind(UserController)
);

UserRoutes.get(
  '/:id/transactions', 
  UserFetchMiddleware,
  JwtAuthMiddleware,
  UserTransactionsReadPermissionMiddleware,
  UserController.readTransactions.bind(UserController)
);

UserRoutes.get(
  '/:id/transactions-balance', 
  UserFetchMiddleware,
  JwtAuthMiddleware,
  UserTransactionsReadPermissionMiddleware,
  UserController.readTransactionsBalance.bind(UserController)
);

export default UserRoutes;
