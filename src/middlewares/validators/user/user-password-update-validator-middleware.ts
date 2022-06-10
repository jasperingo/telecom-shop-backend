import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import UserRepository from '../../../repositories/user-repository';
import HashService from '../../../services/hash-service';
import { isPasswordLength, notEmpty } from '../validation-contraints';

const schema: Schema = {
  password: {
    notEmpty,

    custom: {
      options: async (value, { req }) => {
        const user = await UserRepository.findById((req as Request).data.user.id);
        if (
          user === null ||
          ! (await HashService.comparePassword(value, user.password))
        ) {
          throw 'Field is incorrect';
        }
      }
    }
  },

  newPassword: {
    notEmpty,

    isLength: isPasswordLength,
  }
};

export default async function UserPasswordUpdateValidatorMiddleware(
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
