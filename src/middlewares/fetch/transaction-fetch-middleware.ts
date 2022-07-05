import { NextFunction, Request, Response } from 'express';
import { InternalServerError, NotFoundError } from '../../errors/server-error-handler';
import TransactionRepository from '../../repositories/transaction-repository';

export default async function TransactionFetchMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    const id = req.params.id;

    const transaction = isNaN(Number(id)) 
      ? await TransactionRepository.findByReference(id)
      : await TransactionRepository.findById(Number(id));

    if (transaction !== null) {
      req.data.transaction = transaction;
      next();
    } else {
      next(NotFoundError(`Transaction with id: ${req.params.id}, not found`));
    }
  } catch(error) {
    next(InternalServerError(error));
  }
}
