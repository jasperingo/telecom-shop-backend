import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';
import BrandRepository from '../../../repositories/brand-repository';
import PhotoRepository from '../../../repositories/photo-repository';
import { notEmpty, isNumeric } from '../validation-contraints';

const schema: Schema = {
  apiCode: { 
    notEmpty, 

    isNumeric,
  },

  name: {
    notEmpty,

    custom: {
      options: async (value) => {
        if (await BrandRepository.existsByName(value))
          throw 'Field already exists';
      }
    }
  },

  photoId: {
    notEmpty,

    isNumeric,

    custom: {
      options: async (value) => {
        const photo = await PhotoRepository.findById(value);
        
        if (photo === null)
          throw 'Field do not exist';
        
        if (photo.brand_id !== null) 
          throw 'Field already in use';
      }
    }
  }
};

export default async function BrandCreateValidatorMiddleware(
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
