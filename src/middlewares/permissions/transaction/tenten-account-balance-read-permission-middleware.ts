import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import User from '../../../models/User';

export default function TentenAccountBalanceReadPermissionMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {  
  if ((req.user as User).admin) {
    next();
  } else {
    next(new createHttpError.Forbidden('Permission denied'));
  }
}
