import express from 'express';
import TransactionController from '../controllers/transaction-controller';
import JwtAuthMiddleware from '../middlewares/auth/jwt-auth-middleware';
import PaystackAuthMiddleware from '../middlewares/auth/paystack-auth-middleware';
import TransactionFetchMiddleware from '../middlewares/fetch/transaction-fetch-middleware';
import TentenAccountBalanceReadPermissionMiddleware from '../middlewares/permissions/transaction/tenten-account-balance-read-permission-middleware';
import TransactionCreatePermissionMiddleware from '../middlewares/permissions/transaction/transaction-create-permission-middleware';
import TransactionReadOnePermissionMiddleware from '../middlewares/permissions/transaction/transaction-read-one-permission-middleware';
import TransactionReadPermissionMiddleware from '../middlewares/permissions/transaction/transaction-read-permission-middleware';
import TransactionStatusUpdatePermissionMiddleware from '../middlewares/permissions/transaction/transaction-status-update-permission-middleware';
import TransactionAdminCreatePermissionMiddleware from '../middlewares/permissions/transaction/transaction-admin-create-permission-middleware';
import TransactionCableSubscriptionPaymentValidatorMiddleware from '../middlewares/validators/transaction/transaction-cable-subscription-payment-validator-middleware';
import TransactionDataPaymentValidatorMiddleware from '../middlewares/validators/transaction/transaction-data-payment-validator-middleware';
import TransactionAirtimePaymentValidatorMiddleware from '../middlewares/validators/transaction/transaction-airtime-payment-validator-middleware';
import TransactionDepositValidatorMiddleware from '../middlewares/validators/transaction/transaction-deposit-validator-middleware';
import TransactionElectricityPaymentValidatorMiddleware from '../middlewares/validators/transaction/transaction-electricity-payment-validator-middleware';
import TransactionStatusUpdateValidatorMiddleware from '../middlewares/validators/transaction/transaction-status-update-validator-middleware';
import TransactionAdminDepositValidatorMiddleware from '../middlewares/validators/transaction/transaction-admin-deposit-validator-middleware';

const TransactionRouter = express.Router();

TransactionRouter.post(
  '/deposit',
  JwtAuthMiddleware,
  TransactionCreatePermissionMiddleware,
  TransactionDepositValidatorMiddleware,
  TransactionController.deposit.bind(TransactionController)
);

TransactionRouter.post(
  '/admin/deposit',
  JwtAuthMiddleware,
  TransactionAdminCreatePermissionMiddleware,
  TransactionAdminDepositValidatorMiddleware,
  TransactionController.adminDeposit.bind(TransactionController)
);

TransactionRouter.post(
  '/payment/data',
  JwtAuthMiddleware,
  TransactionCreatePermissionMiddleware,
  TransactionDataPaymentValidatorMiddleware,
  TransactionController.dataPayment.bind(TransactionController)
);

TransactionRouter.post(
  '/payment/airtime',
  JwtAuthMiddleware,
  TransactionCreatePermissionMiddleware,
  TransactionAirtimePaymentValidatorMiddleware,
  TransactionController.airtimePayment.bind(TransactionController)
);

TransactionRouter.post(
  '/payment/electricity',
  JwtAuthMiddleware,
  TransactionCreatePermissionMiddleware,
  TransactionElectricityPaymentValidatorMiddleware,
  TransactionController.electricityPayment.bind(TransactionController)
);

TransactionRouter.post(
  '/payment/cable-subscription',
  JwtAuthMiddleware,
  TransactionCreatePermissionMiddleware,
  TransactionCableSubscriptionPaymentValidatorMiddleware,
  TransactionController.cableSubscriptionPayment.bind(TransactionController)
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
  '/tenten-account-balance',
  JwtAuthMiddleware,
  TentenAccountBalanceReadPermissionMiddleware,
  TransactionController.readTentenAccountBalance.bind(TransactionController)
);

TransactionRouter.get(
  '/paystack-fee',
  TransactionController.readPaystackFee.bind(TransactionController)
);

TransactionRouter.get(
  '/:id',
  TransactionFetchMiddleware,
  JwtAuthMiddleware,
  TransactionReadOnePermissionMiddleware,
  TransactionController.readOne.bind(TransactionController)
);

TransactionRouter.get(
  '',
  JwtAuthMiddleware,
  TransactionReadPermissionMiddleware,
  TransactionController.read.bind(TransactionController)
);

export default TransactionRouter;
