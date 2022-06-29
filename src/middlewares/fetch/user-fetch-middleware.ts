import { NextFunction, Request, Response } from 'express';
import UserRepository from '../../repositories/user-repository';
import { InternalServerError, NotFoundError } from '../../errors/server-error-handler';

export default async function UserFetchMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;

    const user = isNaN(Number(id)) 
      ? await UserRepository.findByEmail(id)
      : await UserRepository.findById(Number(id));

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
