import { NextFunction, Request, Response } from 'express';
import statusCode from 'http-status';
import ResponseDTO from '../dtos/response-dto';
import { InternalServerError } from '../errors/server-error-handler';
import Transaction from '../models/Transaction';
import User from '../models/User';
import TransactionRepository from '../repositories/transaction-repository';
import PaginationService from '../services/pagination-service';
import StringGeneratorService from '../services/string-generator-service';
import TentendataService from '../services/tentendata-service';

const TransactionController = {
  async deposit(req: Request, res: Response, next: NextFunction) {
    try {
      const reference = await StringGeneratorService.generate(
        TransactionRepository.existsByReference,
      ) as string;

      const result = await TransactionRepository.create({
        reference, 
        productUnitId: null,
        recipientNumber: null,
        amount: req.body.amount,  
        userId: (req.user as User).id,
        type: Transaction.TYPE_DEPOSIT,
        status: Transaction.STATUS_CREATED, 
      });

      const transaction = await TransactionRepository.findById(result.id);

      res.status(statusCode.CREATED)
        .send(ResponseDTO.success('Transaction created', transaction));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async paystackWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.event === 'charge.success') {
        const [affectRows] = await TransactionRepository.updateStatusByReference(
          req.body.data.reference, 
          Transaction.STATUS_APPROVED
        );

        if (affectRows === 0) throw 'Transaction reference do not exist';
      }

      res.status(statusCode.OK).send({ reference: req.body.data.reference });
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async readTentenAccountBalance(req: Request, res: Response, next: NextFunction) {
    try {
      const transactionsBalance = await TentendataService.getAccountBalance();

      res.status(statusCode.OK)
        .send(ResponseDTO.success('Transactions balance fetched', { transactionsBalance }));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async dataPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { productUnit } = req.data;

      const reference = await StringGeneratorService.generate(
        TransactionRepository.existsByReference,
      ) as string;

      await TentendataService.buyData(
        productUnit.brand?.apiCode as number, 
        req.body.phoneNumber, 
        productUnit.apiCode
      );

      const result = await TransactionRepository.create({
        reference, 
        amount: -productUnit.price,  
        userId: (req.user as User).id,
        type: Transaction.TYPE_PAYMENT,
        status: Transaction.STATUS_APPROVED, 
        productUnitId: req.body.productUnitId,
        recipientNumber: req.body.phoneNumber,
      });

      const transaction = await TransactionRepository.findById(result.id);

      res.status(statusCode.CREATED)
        .send(ResponseDTO.success('Transaction created', transaction));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.data.transaction;

      await TransactionRepository.updateStatus(id, req.body.status);

      const transaction = await TransactionRepository.findById(id);

      res.status(statusCode.OK)
        .send(ResponseDTO.success('Transaction status updated', transaction));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  readOne(req: Request, res: Response) {
    res.status(statusCode.OK)
      .send(ResponseDTO.success('Transaction fetched', req.data.transaction));
  },

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, cursor } = PaginationService.getCursor(req);

      const { transactions, count } = await TransactionRepository.findAll(cursor, limit);

      const pagination = PaginationService.getResponse(count, transactions, req);

      res.status(statusCode.OK)
        .send(ResponseDTO.success('Transaction fetched', transactions, { pagination }));
    } catch(error) {
      next(InternalServerError(error));
    }
  }
};

export default TransactionController;
