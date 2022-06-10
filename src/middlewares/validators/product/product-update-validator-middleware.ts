import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import ProductRepository from '../../../repositories/product-repository';
import { notEmpty } from '../validation-contraints';

const schema: Schema = {
  name: { 
    optional: true,

    notEmpty,

    custom: {
      options: async (value: string) => {
        if (await ProductRepository.existsByName(value))
          throw 'Field already exists';
      }
    }
  },

  description: { 
    optional: true,
    
    notEmpty 
  },

  available: {
    optional: true,

    isBoolean: true,
  },
};

export default async function ProductUpdateValidatorMiddleware(
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
