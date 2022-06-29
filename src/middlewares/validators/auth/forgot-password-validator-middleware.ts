import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import UserRepository from '../../../repositories/user-repository';
import { isEmail, notEmpty } from '../validation-contraints';

const schema: Schema = {
  email: {
    notEmpty,

    isEmail,

    custom: {
      async options(value, { req }) {
        const user = await UserRepository.findByEmail(value);

        if (user === null)
          throw 'Field do not exist';
        else 
          req.data.user = user;
      }
    }
  },
};

export default async function ForgotPasswordValidatorMiddleware(
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
