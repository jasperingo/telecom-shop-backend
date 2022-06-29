import { NextFunction, Request, Response } from 'express';
import ResponseDTO from '../dtos/response-dto';
import { InternalServerError } from '../errors/server-error-handler';
import User from '../models/User';
import UserRepository from '../repositories/user-repository';
import EmailingService from '../services/emailing-service';
import HashService from '../services/hash-service';
import JWTService from '../services/jwt-service';
import StringGeneratorService from '../services/string-generator-service';

const AuthController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as User;

      const accessToken = await JWTService.sign({ sub: user.id });
      
      res.send(ResponseDTO.success('Authenticated', {
        accessToken,
        type: 'Bearer',
        userId: user.id,
        userIsAdmin: user.admin,
      }));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.data;

      const token = await StringGeneratorService.generate(
        UserRepository.existsByPasswordResetToken, 
        { length: User.PASSWORD_RESET_TOKEN_LENGTH, capitalization: 'uppercase' },
      ) as string;

      await UserRepository.updatePasswordResetToken(user.id, token);

      await EmailingService.sendResetPasswordToken(user.email, token);

      res.send(ResponseDTO.success('Forgot password created'));
    } catch(error) {
      next(InternalServerError(error));
    }
  },

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.data;

      const password = await HashService.hashPassword(req.body.password);

      await UserRepository.updatePassword(user.id, password);

      await UserRepository.updatePasswordResetToken(user.id, null);

      res.send(ResponseDTO.success('Password reset'));
    } catch(error) {
      next(InternalServerError(error));
    }
  }
};

export default AuthController;
