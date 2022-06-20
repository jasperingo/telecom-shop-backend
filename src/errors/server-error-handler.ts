import createHttpError from 'http-errors';

export const InternalServerError = (error: any) => {
  return new createHttpError.InternalServerError(error);
};

export const NotFoundError = (message: string) => {
  return new createHttpError.NotFound(message);
};
