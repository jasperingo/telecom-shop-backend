import express from 'express';
import TransactionController from '../controllers/transaction-controller';
import JwtAuthMiddleware from '../middlewares/auth/jwt-auth-middleware';
import TransactionCreatePermissionMiddleware from '../middlewares/permissions/transaction/transaction-create-permission-middleware';
import TransactionDepositValidatorMiddleware from '../middlewares/validators/transaction/transaction-deposit-validator-middleware';

const TransactionRouter = express.Router();

TransactionRouter.post(
  '/deposit',
  JwtAuthMiddleware,
  TransactionCreatePermissionMiddleware,
  TransactionDepositValidatorMiddleware,
  TransactionController.deposit.bind(TransactionController)
);

export default TransactionRouter;
