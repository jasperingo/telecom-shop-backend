import createHttpError from 'http-errors';
import { Result, ValidationError } from 'express-validator';

export type ValidationErrorFormat = {
  name: string;
  value: any;
  message: string;
  errors: ValidationError[] | unknown[] | undefined;
};

export const ValidationErrorFormatter = (err: ValidationError): ValidationErrorFormat => {
  return {
    name: err.param,
    value: err.value,
    message: err.msg,
    errors: err.nestedErrors
  };
};

// const ValidationHasServerError = (errors: ValidationErrorFormat[]) => {
//   for (const err of errors) {
//     if (err.message as any instanceof Error) {
//       return err.message;
//     }
//   }

//   return null;
// };

export const ValidationBadRequest = (error: Result<ValidationError>) => {
  const data = error.formatWith(ValidationErrorFormatter).array();
  return new createHttpError.BadRequest(data as any);
};
