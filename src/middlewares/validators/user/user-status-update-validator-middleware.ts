import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import { notEmpty } from '../validation-contraints';
import User from '../../../models/User';

const schema: Schema = {
  status: {
    notEmpty,
    
    isIn: {
      options: [User.getStatuses()],
      errorMessage: 'Field is invalid'
    },
  },
};

export default async function UserStatusUpdateValidatorMiddleware(
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
