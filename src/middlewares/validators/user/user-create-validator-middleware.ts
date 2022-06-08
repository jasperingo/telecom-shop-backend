import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import { isEmail, isMobilePhone, isPasswordLength, notEmpty } from '../validation-contraints';

const schema: Schema = {
  firstName: { notEmpty },

  lastName: { notEmpty },

  email: {
    notEmpty,

    isEmail,
  },

  phoneNumber: {
    notEmpty,

    isMobilePhone,
  },

  password: {
    notEmpty,

    isLength: isPasswordLength,
  }
};

export default async function UserCreateValidatorMiddleware(req: Request, res: Response, next: NextFunction) {
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
