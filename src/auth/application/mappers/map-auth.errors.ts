import { HttpStatus } from '@nestjs/common';
import { AuthErrors } from 'src/auth/domain/errors/enum-auth.errors';

export const AuthErrorsMap = {
  [AuthErrors.USER_NOT_FOUND]: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'The user does not exist',
  },
  [AuthErrors.INVALID_PASSWORD]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'The password provided is incorrect',
  },
  [AuthErrors.INVALID_OTP]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'The OTP provided is incorrect',
  },
};
