import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import UserRepository from '../../../repositories/user-repository';
import { isEmail, isMobilePhone, isMobilePhoneLength, notEmpty } from '../validation-contraints';

const schema: Schema = {
  firstName: { 
    optional: true,

    notEmpty 
  },

  lastName: { 
    optional: true,
    
    notEmpty 
  },

  email: {
    optional: true,

    notEmpty,

    isEmail,

    custom: {
      options: async (value: string) => {
        if (await UserRepository.existsByEmail(value))
          throw 'Field already exists';
      }
    }
  },

  phoneNumber: {
    optional: true,

    notEmpty,

    isMobilePhone,

    isLength: isMobilePhoneLength,
    
    custom: {
      options: async (value) => {
        if (await UserRepository.existsByPhoneNumber(value))
          throw 'Field already exists';
      }
    }
  },
};

export default async function UserUpdateValidatorMiddleware(req: Request, res: Response, next: NextFunction) {
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
