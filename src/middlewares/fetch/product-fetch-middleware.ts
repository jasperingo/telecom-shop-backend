import { NextFunction, Request, Response } from 'express';
import { InternalServerError, NotFoundError } from '../../errors/server-error-handler';
import ProductRepository from '../../repositories/product-repository';

export default async function ProductFetchMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return next(NotFoundError(`Product with id: ${req.params.id}, not found`));
    }

    const product = await ProductRepository.findById(id);

    if (product !== null) {
      req.data.product = product;
      next();
    } else {
      next(NotFoundError(`Product with id: ${req.params.id}, not found`));
    }
  } catch(error) {
    next(InternalServerError(error));
  }
}
