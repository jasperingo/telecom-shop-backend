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
  readPaystackFee(req: Request, res: Response) {
    res.status(statusCode.OK)
        .send(ResponseDTO.success('Paystack fee fetched', Transaction.PAYSTACK_FEE));
  },

  generateReference() {
    return StringGeneratorService.generate(
      TransactionRepository.existsByReference,
      {
        capitalization: 'uppercase',
        length: Transaction.REFERENCE_LENGTH,
      },
      3,
      'RYS_'
    ) as Promise<string>;
  },

  async deposit(req: Request, res: Response, next: NextFunction) {
    try {
      const reference = await this.generateReference();

      const amount = req.body.amount;

      const result = await TransactionRepository.create({
        amount,  
        reference, 
        productUnitId: null,
        recipientNumber: null,
        userId: (req.user as User).id,
        type: Transaction.TYPE_DEPOSIT,
        status: Transaction.STATUS_CREATED, 
        depositMethod: Transaction.DEPOSIT_METHOD_PAYSTACK,
        fee: amount <= Transaction.PAYSTACK_FEE.threshold 
          ? Transaction.PAYSTACK_FEE.min 
          : Transaction.PAYSTACK_FEE.max,
      });

      const transaction = await TransactionRepository.findById(result.id);

      res.status(statusCode.CREATED)
        .send(ResponseDTO.success('Transaction created', transaction));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async adminDeposit(req: Request, res: Response, next: NextFunction) {
    try {
      const reference = await this.generateReference();

      const result = await TransactionRepository.create({
        fee: 0,
        reference, 
        productUnitId: null,
        recipientNumber: null,
        amount: req.body.amount,  
        userId: req.data.user.id,
        type: Transaction.TYPE_DEPOSIT,
        status: Transaction.STATUS_APPROVED, 
        depositMethod: Transaction.DEPOSIT_METHOD_DIRECT,
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
        const transaction = await TransactionRepository.findByReference(req.body.data.reference);

        if (transaction === null) {
          throw 'Transaction reference do not exist';
        } else if (
          transaction.type !== Transaction.TYPE_DEPOSIT || 
          transaction.depositMethod !== Transaction.DEPOSIT_METHOD_PAYSTACK ||
          (transaction.total * 100) !== req.body.data.amount
        ) {
          throw 'Transaction is invalid';
        }
  
        await TransactionRepository.updateStatus(transaction.id, Transaction.STATUS_APPROVED);
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

      const reference = await this.generateReference();

      await TentendataService.buyData(
        productUnit.brand?.apiCode as number, 
        req.body.phoneNumber, 
        productUnit.apiCode
      );

      const result = await TransactionRepository.create({
        reference, 
        fee: 0,
        depositMethod: null,
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

  async airtimePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { productUnit } = req.data;

      const reference = await this.generateReference();

      await TentendataService.buyAirtime(
        productUnit.brand?.apiCode as number, 
        req.body.phoneNumber, 
        productUnit.price,
      );

      const result = await TransactionRepository.create({
        reference, 
        fee: 0,
        depositMethod: null,
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

  async electricityPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { productUnit } = req.data;

      const reference = await this.generateReference();

      await TentendataService.buyElectricity(
        productUnit.brand?.apiCode as number, 
        req.body.meterNumber, 
        productUnit.price,
        productUnit.type
      );

      const result = await TransactionRepository.create({
        reference, 
        fee: 0,
        depositMethod: null,
        amount: -productUnit.price,  
        userId: (req.user as User).id,
        type: Transaction.TYPE_PAYMENT,
        status: Transaction.STATUS_APPROVED, 
        productUnitId: req.body.productUnitId,
        recipientNumber: req.body.meterNumber,
      });

      const transaction = await TransactionRepository.findById(result.id);

      res.status(statusCode.CREATED)
        .send(ResponseDTO.success('Transaction created', transaction));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async cableSubscriptionPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { productUnit } = req.data;

      const reference = await this.generateReference();

      await TentendataService.buyCableSubscription(
        productUnit.brand?.apiCode as number, 
        productUnit.apiCode,
        req.body.smartCardNumber,
      );

      const result = await TransactionRepository.create({
        reference, 
        fee: 0,
        depositMethod: null,
        amount: -productUnit.price,  
        userId: (req.user as User).id,
        type: Transaction.TYPE_PAYMENT,
        status: Transaction.STATUS_APPROVED, 
        productUnitId: req.body.productUnitId,
        recipientNumber: req.body.smartCardNumber,
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
