import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import Transaction from '../../../models/Transaction';
import { notEmpty } from '../validation-contraints';

const schema: Schema = {
  status: { 
    notEmpty,

    isIn: {
      options: [Transaction.getStatuses()],
      errorMessage: 'Field is invalid',
    },

    custom: {
      options(value, { req }) {
        const transaction = (req as Request).data.transaction;
        if (
          transaction.type === Transaction.TYPE_PAYMENT ||
          (
            transaction.type === Transaction.TYPE_DEPOSIT && 
            (
              transaction.status !== Transaction.STATUS_CREATED ||
              (
                value === Transaction.STATUS_CREATED || 
                value === Transaction.STATUS_APPROVED || 
                value === Transaction.STATUS_FAILED
              )
            )
          )
        ) {
          return false;
        }
        
        return true;
      },
      errorMessage: 'Field is not allowed',
    }
  }
};

export default async function TransactionStatusUpdateValidatorMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {

    await checkSchema(schema).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw ValidationBadRequest(errors);
    }

    next();
  } catch(error) {
    next(error);
  }
}
