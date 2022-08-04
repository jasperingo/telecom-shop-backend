import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import EmailingService from '../../services/emailing-service';
import User from '../../models/User';

export default async function PasswordAuthPermissionMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
) { 
  const user = req.user as User;

  if (!user.emailVerified) {
    await EmailingService.sendEmailVerificationToken(
      user.email, 
      user.emailVerificationToken,
    );

    next(new createHttpError.Forbidden({ userId: user.id, errorCode: 'ACCOUNT_EMAIL_UNVERIFIED' } as any));
  } else if (user.status === User.STATUS_DEACTIVATED) {
    next(new createHttpError.Forbidden({ userId: user.id, errorCode: 'ACCOUNT_DEACTIVATED' } as any));
  } else {
    next();
  }
}
