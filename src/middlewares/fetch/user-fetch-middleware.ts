import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import UserRepository from '../../repositories/user-repository';
import { InternalServerError } from '../../errors/server-error-handler';

export default async function UserFetchMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserRepository.findById(Number(req.params.id));

    if (user !== null) {
      req.data.user = user;
      next();
    } else {
      next(new createHttpError.NotFound(`User with id: ${req.params.id}, not found`));
    }
  } catch(error) {
    next(InternalServerError(error));
  }
}
