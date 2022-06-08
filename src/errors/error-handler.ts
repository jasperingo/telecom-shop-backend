import { NextFunction, Request, Response } from 'express';
import httpErrors from 'http-errors';
import ResponseDTO from '../dtos/response-dto';

export default function ErrorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  res.status(err instanceof httpErrors.HttpError ? err.status : 500)
    .send(
      ResponseDTO.error(
        err.name, 
        err instanceof httpErrors.BadRequest 
          ? (err as httpErrors.HttpError & { data: any }).data
          : err.message
      )
    );
}
