import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import BrandRepository from '../../../repositories/brand-repository';
import { notEmpty, isNumeric, isBoolean } from '../validation-contraints';

const schema: Schema = {
  name: { 
    optional: true,

    notEmpty,
  },

  price: { 
    optional: true,

    notEmpty, 

    isNumeric,
  },

  duration: { 
    optional: true,

    notEmpty, 

    isNumeric,
  },

  apiCode: { 
    optional: true,

    notEmpty, 

    isNumeric,
  },

  available: {
    optional: true,

    notEmpty,
    
    isBoolean,
  },

  brandId: {
    optional: true,
    
    notEmpty,

    isNumeric,

    custom: {
      options: async (value) => {
        if (! (await BrandRepository.existsById(value)))
          throw 'Field do not exist';
      }
    }
  }
};

export default async function ProductUnitUpdateValidatorMiddleware(
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
