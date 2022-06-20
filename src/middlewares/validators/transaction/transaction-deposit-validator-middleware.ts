import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import { notEmpty } from '../validation-contraints';

const schema: Schema = {
  amount: { 
    notEmpty,

    isFloat: {
      options: { min: 500 },
      errorMessage: 'Field should be a number not less than 500',
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
