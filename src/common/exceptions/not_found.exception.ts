import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(errorCode: number, message?: string, errors?: string[]) {
    super(
      {
        data: [],
        errorCode,
        message: message || 'Not Found',
        errors: errors || [],
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
