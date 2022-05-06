import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { getDupKeyMongoField, getDupKeyMongodb } from '../utils/function.util';
import { Response } from 'express';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let fieldError = '';
    let errorMessage = '';
    let errorValue = [];

    switch (exception.code) {
      case 11000:
        fieldError = getDupKeyMongoField(exception.message);
        errorMessage = 'Duplicated field';

        errorValue = getDupKeyMongodb(exception.message);

        response.status(HttpStatus.BAD_REQUEST).json({
          data: [],
          errorCode: 1001,
          message: 'Duplicated field',
          errors: errorValue,
        });
    }
  }
}
