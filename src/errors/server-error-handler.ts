import createHttpError from 'http-errors';

export const InternalServerError = (error: any) => {
  return new createHttpError.InternalServerError(error);
};
