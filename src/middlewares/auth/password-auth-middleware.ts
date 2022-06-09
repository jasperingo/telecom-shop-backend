import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import passport from 'passport';

export default function PasswordAuthMiddleware(req: Request, res: Response, next: NextFunction) { 
  passport.authenticate(
    'local', 
    (err, user) => {
      if (err !== null) {
        next(err);
      } else if (user === false) { 
        next(new createHttpError.Unauthorized()); 
      } else {
        req.user = user;
        next();
      }
    }
  )(req, res, next);
}
