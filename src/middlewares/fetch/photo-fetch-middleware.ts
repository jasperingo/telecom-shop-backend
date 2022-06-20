import { NextFunction, Request, Response } from 'express';
import { InternalServerError, NotFoundError } from '../../errors/server-error-handler';
import PhotoRepository from '../../repositories/photo-repository';

export default async function PhotoFetchMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return next(NotFoundError(`Photo with id: ${req.params.id}, not found`));
    }

    const photo = await PhotoRepository.findById(id);

    if (photo !== null) {
      req.data.photo = photo;
      next();
    } else {
      next(NotFoundError(`Photo with id: ${req.params.id}, not found`));
    }
  } catch(error) {
    next(InternalServerError(error));
  }
}
