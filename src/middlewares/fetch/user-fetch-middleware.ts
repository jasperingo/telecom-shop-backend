import { NextFunction, Request, Response } from 'express';
import UserRepository from '../../repositories/user-repository';
import { InternalServerError, NotFoundError } from '../../errors/server-error-handler';

export default async function UserFetchMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return next(NotFoundError(`User with id: ${req.params.id}, not found`));
    }

    const user = await UserRepository.findById(id);

    if (user !== null) {
      req.data.user = user;
      next();
    } else {
      next(NotFoundError(`User with id: ${req.params.id}, not found`));
    }
  } catch(error) {
    next(InternalServerError(error));
  }
}
