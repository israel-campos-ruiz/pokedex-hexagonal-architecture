import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { AuthErrorsMap } from '../mappers/mapper-auth.errors';

@Injectable()
export class AuthErrorHandler {
  handleError(errorCode: string): void {
    const error = AuthErrorsMap[errorCode];

    if (!error) {
      throw new HttpException(
        'An unknown error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    throw new HttpException(error.message, error.statusCode);
  }
}
