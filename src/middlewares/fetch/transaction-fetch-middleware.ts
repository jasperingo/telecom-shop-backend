import { NextFunction, Request, Response } from 'express';
import { InternalServerError, NotFoundError } from '../../errors/server-error-handler';
import TransactionRepository from '../../repositories/transaction-repository';

export default async function TransactionFetchMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return next(NotFoundError(`Transaction with id: ${req.params.id}, not found`));
    }

    const transaction = await TransactionRepository.findById(id);

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
