import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import BrandRepository from '../../../repositories/brand-repository';
import { notEmpty, isNumeric, isBoolean, isPrice } from '../validation-contraints';

const schema: Schema = {
  name: { 
    optional: true,

    notEmpty,
  },

  price: { 
    optional: true,

    notEmpty, 

    isFloat: isPrice,
  },

  purchasingPrice: { 
    optional: true,
    
    notEmpty, 

    isFloat: isPrice,
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

  type: {
    optional: true,

    isString: true,
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
