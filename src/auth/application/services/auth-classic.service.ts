/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';

import { REPOSITORY_TYPES_AUTH } from 'src/auth/domain/types/repository.types';
import { BaseAuthRepository } from 'src/auth/infraestructure/repositorys/Base-auth-repository';
import { ApplicationService } from 'src/commons/domain/application-service';
import { UserDomain } from 'src/users/domain/entities/user.domain';
import * as bcrypt from 'bcrypt';
import { AuthErrorHandler } from './errors-auth.service';
import { JwtService } from 'src/commons/application/services/jwt/jwt.service';
@Injectable()
export class AuthClassicService implements ApplicationService<any> {
  constructor(
    @Inject(REPOSITORY_TYPES_AUTH.BaseRepositoryAuth)
    private readonly repositoryAuth: BaseAuthRepository<UserDomain>,
    private readonly jwtService: JwtService,
    private readonly authErrorService: AuthErrorHandler,
  ) {}
  async process(data?: any) {
    try {
      const findUser = await this.repositoryAuth.signLocal(data);
      if (findUser === null) {
        this.authErrorService.handleError('USER_NOT_FOUND');
      }
      const user = new UserDomain({
        email: findUser.email,
        name: findUser.name,
        userId: findUser.userId,
        password: findUser.password,
        pokemon: findUser.pokemon,
      });

      const isValidPassword = user.isPasswordValid(
        data.password,
        (plain, hashed) => bcrypt.compareSync(plain, hashed),
      );
      if (!isValidPassword) {
        this.authErrorService.handleError('INVALID_PASSWORD');
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
