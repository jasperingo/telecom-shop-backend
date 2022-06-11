import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Action, PermissionBuilder } from '../../../configs/permission-config';
import Brand from '../../../models/Brand';
import User from '../../../models/User';

export default function BrandReadPermissionMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const ability = PermissionBuilder(req.user as User);
  
  if (ability.can(Action.Read, Brand)) {
    next();
  } else {
    next(new createHttpError.Forbidden('Permission denied'));
  }
}
