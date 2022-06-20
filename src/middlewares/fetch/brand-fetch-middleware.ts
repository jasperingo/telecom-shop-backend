import { NextFunction, Request, Response } from 'express';
import { InternalServerError, NotFoundError } from '../../errors/server-error-handler';
import BrandRepository from '../../repositories/brand-repository';

export default async function BrandFetchMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return next(NotFoundError(`Brand with id: ${req.params.id}, not found`));
    }

    const brand = await BrandRepository.findById(id);

    if (brand !== null) {
      req.data.brand = brand;
      next();
    } else {
      next(NotFoundError(`Brand with id: ${req.params.id}, not found`));
    }
  } catch(error) {
    next(InternalServerError(error));
  }
}
