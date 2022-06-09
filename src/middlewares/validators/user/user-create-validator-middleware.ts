import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import UserRepository from '../../../repositories/user-repository';
import { isEmail, isMobilePhone, isPasswordLength, notEmpty } from '../validation-contraints';

const schema: Schema = {
  firstName: { notEmpty },

  lastName: { notEmpty },

  email: {
    notEmpty,

    isEmail,

    custom: {
      options: async (value) => {
        if (await UserRepository.existsByEmail(value))
          throw 'Field already exists';
      }
    }
  },

  phoneNumber: {
    notEmpty,

    isMobilePhone,

    custom: {
      options: async (value) => {
        if (await UserRepository.existsByPhoneNumber(value))
          throw 'Field already exists';
      }
    }
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
