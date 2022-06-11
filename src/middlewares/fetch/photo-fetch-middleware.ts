import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { InternalServerError } from '../../errors/server-error-handler';
import PhotoRepository from '../../repositories/photo-repository';

export default async function PhotoFetchMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const photo = await PhotoRepository.findById(Number(req.params.id));

    if (photo !== null) {
      req.data.photo = photo;
      next();
    } else {
      next(new createHttpError.NotFound(`Photo with id: ${req.params.id}, not found`));
    }
  } catch(error) {
    next(InternalServerError(error));
  }
}
