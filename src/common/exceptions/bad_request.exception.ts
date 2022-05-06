import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(errorCode: number, message?: string, errors?: any[]) {
    super(
      {
        data: [],
        errorCode,
        message: message || 'Bad Request',
        errors: errors || [],
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
