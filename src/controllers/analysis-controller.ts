import { NextFunction, Request, Response } from 'express';
import statusCode from 'http-status';
import { InternalServerError } from '../errors/server-error-handler';
import ResponseDTO from '../dtos/response-dto';
import UserRepository from '../repositories/user-repository';
import BrandRepository from '../repositories/brand-repository';
import ProductRepository from '../repositories/product-repository';
import ProductUnitRepository from '../repositories/product-unit-repository';
import TransactionRepository from '../repositories/transaction-repository';
import Transaction from '../models/Transaction';

const AnalysisController = {
  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const [
        users, 
        brands, 
        products, 
        productUnits,
        transactions,
        transactionPayments,
        transactionDeposits,
        transactionBonuses,
        transactionPaymentsSum,
        transactionDepositsSum,
        transactionBonusesSum,
      ] = await Promise.all([
        UserRepository.countAll(),
        BrandRepository.countAll(),
        ProductRepository.countAll(),
        ProductUnitRepository.countAll(),
        TransactionRepository.countAll(),
        TransactionRepository.countAllByType(Transaction.TYPE_PAYMENT),
        TransactionRepository.countAllByType(Transaction.TYPE_DEPOSIT),
        TransactionRepository.countAllByType(Transaction.TYPE_BONUS),
        TransactionRepository.sumAmountByTypeAndStatus(Transaction.TYPE_PAYMENT),
        TransactionRepository.sumAmountByTypeAndStatus(Transaction.TYPE_DEPOSIT),
        TransactionRepository.sumAmountByTypeAndStatus(Transaction.TYPE_BONUS),
      ]);

      const analysis = {
        numberOfUsers: users,
        numberOfBrands: brands,
        numberOfProducts: products,
        numberOfProductUnits: productUnits,
        numberOfTransactions: transactions,
        numberOfPaymentTransactions: transactionPayments,
        numberOfDepositTransactions: transactionDeposits,
        numberOfBonusTransactions: transactionBonuses,
        sumOfPaymentTransactions: Math.abs(transactionPaymentsSum),
        sumOfDepositTransactions: transactionDepositsSum,
        sumOfBonusTransactions: transactionBonusesSum,
      };

      res.status(statusCode.OK)
        .send(ResponseDTO.success('Analysis fetched', analysis));
    } catch(error) {
      next(InternalServerError(error));
    }
  }
};

export default AnalysisController;
