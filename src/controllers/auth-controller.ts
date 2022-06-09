import { NextFunction, Request, Response } from 'express';
import ResponseDTO from '../dtos/response-dto';
import { InternalServerError } from '../errors/server-error-handler';
import User from '../models/User';
import JWTService from '../services/jwt-service';

const AuthController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as User;

      const accessToken = await JWTService.sign({ id: user.id });
      
      res.send(ResponseDTO.success('Authenticated', {
        accessToken,
        type: 'Bearer',
        userId: user.id,
      }));
    } catch(error) {
      next(InternalServerError(error));
    }
  }
};

export default AuthController;
