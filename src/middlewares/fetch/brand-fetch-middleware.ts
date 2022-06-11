import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { InternalServerError } from '../../errors/server-error-handler';
import BrandRepository from '../../repositories/brand-repository';

export default async function BrandFetchMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const brand = await BrandRepository.findById(Number(req.params.id));

    if (brand !== null) {
      req.data.brand = brand;
      next();
    } else {
      next(new createHttpError.NotFound(`Brand with id: ${req.params.id}, not found`));
    }
  } catch(error) {
    next(InternalServerError(error));
  }
}
