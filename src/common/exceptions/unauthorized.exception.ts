import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(errorCode: number, message?: string, errors?: string[]) {
    super(
      {
        data: [],
        errorCode,
        message: message || 'Unauthorized',
        errors: errors || [],
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
