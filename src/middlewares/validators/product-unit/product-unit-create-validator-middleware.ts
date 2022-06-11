import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import BrandRepository from '../../../repositories/brand-repository';
import ProductRepository from '../../../repositories/product-repository';
import { notEmpty, isNumeric, isBoolean } from '../validation-contraints';

const schema: Schema = {
  name: { notEmpty },

  price: { 
    notEmpty, 

    isNumeric,
  },

  duration: { 
    notEmpty, 

    isNumeric,
  },

  apiCode: { 
    notEmpty, 

    isNumeric,
  },

  available: {
    notEmpty,
    
    isBoolean,
  },

  productId: {
    notEmpty,

    isNumeric,

    custom: {
      options: async (value) => {
        if (! (await ProductRepository.existsById(value)))
          throw 'Field do not exist';
      }
    }
  },

  brandId: {
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

export default async function ProductUnitCreateValidatorMiddleware(
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
