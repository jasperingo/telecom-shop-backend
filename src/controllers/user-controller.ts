import { NextFunction, Request, Response } from 'express';
import statusCode from 'http-status';
import ResponseDTO from '../dtos/response-dto';
import { InternalServerError } from '../errors/server-error-handler';
import UserRepository from '../repositories/user-repository';
import HashService from '../services/hash-service';

const UserController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.password = await HashService.hashPassword(req.body.password);

      const result = await UserRepository.create(req.body);

      const user = await UserRepository.findById(result.id);
  
      res.status(statusCode.CREATED).send(ResponseDTO.success('User created', user));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async update(req: Request, res: Response, _next: NextFunction) {
    res.status(statusCode.OK).send(ResponseDTO.success('User updated'));
  }
};

export default UserController;
