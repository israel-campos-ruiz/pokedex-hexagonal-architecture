import { Inject, Injectable } from '@nestjs/common';
import { ApplicationService } from 'src/commons/domain/application-service';
import * as crypto from 'crypto';
import { REPOSITORY_TYPES_AUTH } from 'src/auth/domain/types/repository.types';
import { BaseAuthRepository } from 'src/auth/infraestructure/repositorys/Base-auth-repository';
import { AuthErrorHandler } from './errors-auth.service';
import { UserDomain } from 'src/users/domain/entities/user.domain';

@Injectable()
export class OtpGenerateService
  implements ApplicationService<{ email: string }>
{
  constructor(
    @Inject(REPOSITORY_TYPES_AUTH.BaseRepositoryAuth)
    private readonly repositoryAuth: BaseAuthRepository<any>,
    private readonly errorHandler: AuthErrorHandler,
  ) {}
  async process(args: { email: string }) {
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const userFind = await this.repositoryAuth.findByEmail(args);
    if (!userFind) {
      return this.errorHandler.handleError('USER_NOT_FOUND');
    }
    const user = new UserDomain({
      email: args.email,
      otp,
      otpExpiresAt: expiresAt,
      name: userFind.name,
      _id: userFind._id,
      password: userFind.password,
      userId: userFind.userId,
      pokemon: userFind.pokemon,
    });
    user.setOtp(otp, expiresAt);
    return await this.repositoryAuth.createOtp(user);
  }
}
