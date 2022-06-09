import { NextFunction, Request, Response } from 'express';
import httpErrors from 'http-errors';
import ResponseDTO from '../dtos/response-dto';

export default function ErrorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  if (process.env.NODE_ENV === 'development') console.error(err);
  
  res.status(err instanceof httpErrors.HttpError ? err.status : 500)
    .send(ResponseDTO.error(err.name, err.message));
}
