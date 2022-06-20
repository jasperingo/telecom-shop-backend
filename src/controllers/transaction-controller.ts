import { NextFunction, Request, Response } from 'express';
import statusCode from 'http-status';
import ResponseDTO from '../dtos/response-dto';
import { InternalServerError } from '../errors/server-error-handler';
import Transaction from '../models/Transaction';
import User from '../models/User';
import TransactionRepository from '../repositories/transaction-repository';
import StringGeneratorService from '../services/string-generator-service';

const TransactionController = {
  async deposit(req: Request, res: Response, next: NextFunction) {
    try {
      const reference = await StringGeneratorService.generate(
        TransactionRepository.existsByReference,
      ) as string;

      const result = await TransactionRepository.create({
        reference, 
        amount: req.body.amount,  
        userId: (req.user as User).id,
        type: Transaction.TYPE_DEPOSIT,
        status: Transaction.STATUS_CREATED, 
      } as any);

      const transaction = await TransactionRepository.findById(result.id);

      res.status(statusCode.CREATED)
        .send(ResponseDTO.success('Transaction created', transaction));
    } catch(error) {
      next(InternalServerError(error));
    }
  }
};

export default TransactionController;
