import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

export default function PaystackAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET as string)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
      throw 'paystack signature is incorrect';
    }

    next();

  } catch (error) {
    next(new createHttpError.Unauthorized(error as any));
  }
}
