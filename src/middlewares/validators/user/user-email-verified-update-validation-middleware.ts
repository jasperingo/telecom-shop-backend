import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import UserRepository from '../../../repositories/user-repository';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import { notEmpty } from '../validation-contraints';

const schema: Schema = {
  emailVerificationToken: {
    notEmpty,
    
    custom: {
      async options(value, { req }) {
        const user = await UserRepository.findByEmailVerificationToken(value);

        if (user === null)
          throw 'Field do not exist';
        else if (user.id !== req.data.user.id)
          throw 'Field is invalid';
      }
    },
  },
};

export default async function UserEmailVerifiedUpdateValidatorMiddleware(
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
