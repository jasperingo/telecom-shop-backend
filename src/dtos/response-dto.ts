import type PaginationDto from './pagination-dto';

export default class ResponseDTO {
  /*eslint-disable */
  constructor(
    public status: 'error' | 'success',
    public message?: string, 
    public data?: any, 
    public metaData?: { pagination: PaginationDto; }
  ) {}

  static error(message: string, data?: any) {
    return new ResponseDTO('error', message, data);
  }

  static success(message: string, data?: any, metaData?: any) {
    return new ResponseDTO('success', message, data, metaData);
  }
}
