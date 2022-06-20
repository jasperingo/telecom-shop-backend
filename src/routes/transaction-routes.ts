import express from 'express';
import TransactionController from '../controllers/transaction-controller';
import JwtAuthMiddleware from '../middlewares/auth/jwt-auth-middleware';
import PaystackAuthMiddleware from '../middlewares/auth/paystack-auth-middleware';
import TransactionFetchMiddleware from '../middlewares/fetch/transaction-fetch-middleware';
import TransactionCreatePermissionMiddleware from '../middlewares/permissions/transaction/transaction-create-permission-middleware';
import TransactionReadOnePermissionMiddleware from '../middlewares/permissions/transaction/transaction-read-one-permission-middleware';
import TransactionStatusUpdatePermissionMiddleware from '../middlewares/permissions/transaction/transaction-status-update-permission-middleware';
import TransactionDepositValidatorMiddleware from '../middlewares/validators/transaction/transaction-deposit-validator-middleware';
import TransactionStatusUpdateValidatorMiddleware from '../middlewares/validators/transaction/transaction-status-update-validator-middleware';

const TransactionRouter = express.Router();

TransactionRouter.post(
  '/deposit',
  JwtAuthMiddleware,
  TransactionCreatePermissionMiddleware,
  TransactionDepositValidatorMiddleware,
  TransactionController.deposit.bind(TransactionController)
);

TransactionRouter.post(
  '/paystack-webhook',
  PaystackAuthMiddleware,
  TransactionController.paystackWebhook.bind(TransactionController)
);

TransactionRouter.put(
  '/:id/status',
  TransactionFetchMiddleware,
  JwtAuthMiddleware,
  TransactionStatusUpdatePermissionMiddleware,
  TransactionStatusUpdateValidatorMiddleware,
  TransactionController.updateStatus.bind(TransactionController)
);

TransactionRouter.get(
  '/:id',
  TransactionFetchMiddleware,
  JwtAuthMiddleware,
  TransactionReadOnePermissionMiddleware,
  TransactionController.readOne.bind(TransactionController)
);

export default TransactionRouter;