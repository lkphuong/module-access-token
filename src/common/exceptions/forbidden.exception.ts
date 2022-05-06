import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(errorCode: number, message?: string, errors?: string[]) {
    super(
      {
        data: [],
        errorCode,
        message: message || 'Forbidden',
        errors: errors || [],
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
