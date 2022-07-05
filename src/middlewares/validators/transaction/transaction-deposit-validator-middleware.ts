import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import { notEmpty } from '../validation-contraints';
import Transaction from '../../../models/Transaction';

const schema: Schema = {
  amount: { 
    notEmpty,

    isFloat: {
      options: { min: Transaction.MINIMIUM_DEPOSIT_AMOUNT },
      errorMessage: `Field should be a number not less than ${Transaction.MINIMIUM_DEPOSIT_AMOUNT}`,
    }
  }
};

export default async function TransactionDepositValidatorMiddleware(
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
