import { Inject, Injectable } from '@nestjs/common';
import { ApplicationService } from 'src/commons/domain/application-service';
import { UserDomain } from 'src/users/domain/entities/user.domain';
import { REPOSITORY_TYPES_USER } from 'src/users/domain/types/repository.types';
import { BaseUserRepository } from 'src/users/infrastructure/repositorys/Base-user-respository';

@Injectable()
export class FindOneService implements ApplicationService<UserDomain> {
  constructor(
    @Inject(REPOSITORY_TYPES_USER.BaseRepositoryUser)
    private readonly userRepository: BaseUserRepository<UserDomain>,
  ) {}
  async process(data?: UserDomain) {
    return await this.userRepository.findOne(data);
  }
}
