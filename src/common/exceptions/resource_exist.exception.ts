import { HttpException } from '@nestjs/common';

export class ResourceExistException extends HttpException {
  constructor(errorCode: number, message?: string, errors?: string[]) {
    super(
      {
        data: [],
        errorCode,
        message: message || 'Resource Exist',
        errors: errors || [],
      },
      409,
    );
  }
}
