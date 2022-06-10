import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Action, PermissionBuilder } from '../../../configs/permission-config';
import User from '../../../models/User';

export default function ProductUpdatePermissionMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const ability = PermissionBuilder(req.user as User);
  
  if (ability.can(Action.Update, req.data.product)) {
    next();
  } else {
    next(new createHttpError.Forbidden('Permission denied'));
  }
}
