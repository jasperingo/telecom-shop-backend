import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import UserRepository from '../../../repositories/user-repository';
import { notEmpty, isNumeric } from '../validation-contraints';

const schema: Schema = {
  amount: { 
    notEmpty,

    isFloat: {
      options: { min: 500 },
      errorMessage: 'Field should be a number not less than 500',
    }
  },

  userId: {
    notEmpty,

    isNumeric,

    custom: {
      async options(value, { req }) {
        const user = await UserRepository.findById(value);

        if (user === null) 
          throw 'Field is invalid';
        else 
          req.data.user = user;
      }
    }
  }
};

export default async function TransactionAdminDepositValidatorMiddleware(
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
