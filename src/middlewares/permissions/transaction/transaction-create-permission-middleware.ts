import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Action, PermissionBuilder } from '../../../configs/permission-config';
import Transaction from '../../../models/Transaction';
import User from '../../../models/User';

export default function TransactionCreatePermissionMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const ability = PermissionBuilder(req.user as User);
  
  if (ability.can(Action.Create, Transaction)) {
    next();
  } else {
    next(new createHttpError.Forbidden('Permission denied'));
  }
}
