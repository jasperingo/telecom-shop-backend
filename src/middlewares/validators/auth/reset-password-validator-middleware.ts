import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import User from '../../../models/User';
import UserRepository from '../../../repositories/user-repository';
import { isPasswordLength, notEmpty } from '../validation-contraints';

const schema: Schema = {
  passwordResetToken: {
    notEmpty,

    isLength: {
      options: { 
        max: User.PASSWORD_RESET_TOKEN_LENGTH, 
        min: User.PASSWORD_RESET_TOKEN_LENGTH 
      } 
    },

    custom: {
      async options(value, { req }) {
        const user = await UserRepository.findByPasswordResetToken(value);

        if (user === null)
          throw 'Field do not exist';
        else 
          req.data.user = user;
      }
    }
  },

  password: {
    notEmpty,

    isLength: isPasswordLength,
  }
};

export default async function ResetPasswordValidatorMiddleware(
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
