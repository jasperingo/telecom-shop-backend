import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { ValidationBadRequest } from '../../../errors/validation-error-handler';

export default async function PhotoUploadValidatorMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {

    if (req.file === undefined) {
      await body('photo').custom(()=> { throw 'Field is required'; }).run(req);
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw ValidationBadRequest(errors);
    }

    next();
  } catch(error) {
    next(error);
  }
}
