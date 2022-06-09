export default class ResponseDTO {
  
  /*eslint-disable */
  constructor(
    public status: 'error' | 'success',
    public message?: string, 
    public data?: any, 
    public pagination?: any
  ) {}

  static error(message: string, data?: any) {
    return new ResponseDTO('error', message, data);
  }

  static success(message: string, data?: any, pagination?: any) {
    return new ResponseDTO('success', message, data, pagination);
  }

}
