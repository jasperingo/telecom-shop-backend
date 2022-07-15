import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Action, PermissionBuilder } from '../../../configs/permission-config';
import User from '../../../models/User';

export default function UserReferralsReadPermissionMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const ability = PermissionBuilder(req.user as User);

  const user = new User();

  user.referralId = req.data.user.id;
  
  if (ability.can(Action.Read, user)) {
    next();
  } else {
    next(new createHttpError.Forbidden('Permission denied'));
  }
}
