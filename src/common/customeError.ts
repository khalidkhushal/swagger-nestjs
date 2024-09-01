import { HttpException } from '@nestjs/common';

export class CustomError extends  HttpException {
  constructor(
    message: string,
    statusCode: number,
    errorStack?: string,
  ) {
    const response: { result: any, errors: string[], status: number, stack?: string } = {
      result: null,
      errors: [message],
      status: statusCode,
    };
    
    super(response, statusCode);
    if (errorStack) {
      this.stack = errorStack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}