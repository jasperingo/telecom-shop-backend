import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { InternalServerError } from '../../errors/server-error-handler';
import ProductRepository from '../../repositories/product-repository';

export default async function ProductFetchMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await ProductRepository.findById(Number(req.params.id));

    if (product !== null) {
      req.data.product = product;
      next();
    } else {
      next(new createHttpError.NotFound(`Product with id: ${req.params.id}, not found`));
    }
  } catch(error) {
    next(InternalServerError(error));
  }
}
