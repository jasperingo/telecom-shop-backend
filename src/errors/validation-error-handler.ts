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

export const ValidationBadRequest = (error: Result<ValidationError>) => {
  return createHttpError(400, {}, { data: error.formatWith(ValidationErrorFormatter).array() });
};
