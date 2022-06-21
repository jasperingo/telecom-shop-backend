import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import User from '../../../models/User';

export default function TransactionSuperAdminCreatePermissionMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const user = req.user as User;
  
  if (user.admin && user.adminRole === User.ADMIN_ROLE_SUPER) {
    next();
  } else {
    next(new createHttpError.Forbidden('Permission denied'));
  }
}
