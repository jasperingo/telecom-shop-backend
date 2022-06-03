import { NextFunction, Request, Response } from 'express';

export default function ErrorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  res.status(500).send(err);
}
