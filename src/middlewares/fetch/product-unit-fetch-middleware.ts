import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { InternalServerError } from '../../errors/server-error-handler';
import ProductUnitRepository from '../../repositories/product-unit-repository';

export default async function ProductUnitFetchMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    const productUnit = await ProductUnitRepository.findById(Number(req.params.id));

    if (productUnit !== null) {
      req.data.productUnit = productUnit;
      next();
    } else {
      next(new createHttpError.NotFound(`Product unit with id: ${req.params.id}, not found`));
    }
  } catch(error) {
    next(InternalServerError(error));
  }
}
