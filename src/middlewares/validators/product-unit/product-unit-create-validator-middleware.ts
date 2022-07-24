import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import BrandRepository from '../../../repositories/brand-repository';
import ProductRepository from '../../../repositories/product-repository';
import { notEmpty, isNumeric, isBoolean, isPrice } from '../validation-contraints';

const schema: Schema = {
  name: { notEmpty },

  price: { 
    notEmpty, 

    isFloat: isPrice,
  },

  purchasingPrice: { 
    notEmpty, 

    isFloat: isPrice,
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

  type: {
    optional: true,

    isString: true,
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
