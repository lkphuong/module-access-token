import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerErrorException extends HttpException {
  constructor(errorCode: number, message?: string, errors?: string[]) {
    super(
      {
        data: [],
        errorCode,
        message: message || 'Internal Server Error',
        errors: errors || [],
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
