import { HttpException, HttpStatus } from '@nestjs/common';

export class UnsupportedMediaTypeException extends HttpException {
  constructor(errorCode: number, message?: string, errors?: string[]) {
    super(
      {
        data: [],
        errorCode,
        message: message || 'Unsupported media',
        errors: errors || [],
      },
      HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    );
  }
}
