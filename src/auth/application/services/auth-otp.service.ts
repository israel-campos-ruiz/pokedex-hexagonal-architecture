/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from 'src/commons/application/services/jwt/jwt.service';
import { REPOSITORY_TYPES_AUTH } from 'src/auth/domain/types/repository.types';
import { BaseAuthRepository } from 'src/auth/infraestructure/repositorys/Base-auth-repository';
import { ApplicationService } from 'src/commons/domain/application-service';
import { UserDomain } from 'src/users/domain/entities/user.domain';
import { AuthErrorHandler } from './errors-auth.service';

@Injectable()
export class AuthOtpService implements ApplicationService<any> {
  constructor(
    @Inject(REPOSITORY_TYPES_AUTH.BaseRepositoryAuth)
    private readonly repositoryAuth: BaseAuthRepository<UserDomain>,
    private readonly jwtService: JwtService,
    private readonly authErrorService: AuthErrorHandler,
  ) {}
  async process(data?: any, metadata?: any) {
    try {
      const findUser = await this.repositoryAuth.signOtp(data);
      if (findUser === null) {
        this.authErrorService.handleError('USER_NOT_FOUND');
      }
      const user = new UserDomain({
        email: findUser.email,
        name: findUser.name,
        userId: findUser.userId,
        password: findUser.password,
        pokemon: findUser.pokemon,
        otp: findUser.otp,
        otpExpiresAt: findUser.otpExpiresAt,
      });

      const isValidOtp = user.isOtpValid(data);
      if (!isValidOtp) {
        this.authErrorService.handleError('INVALID_OTP');
      }
      const { password, _id, userId, ...rest } = findUser;

      const jwtUser = this.jwtService.createJwt(rest);
      return {
        status: 200,
        ok: true,
        email: rest.email,
        token: jwtUser,
      };
    } catch (error) {
      throw error;
    }
  }
}
