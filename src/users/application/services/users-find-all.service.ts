import { Inject, Injectable } from '@nestjs/common';
import { ApplicationService } from 'src/commons/domain/application-service';
import { BaseRepository } from 'src/pokemons/infraestructure/repositorys/Base.repository';
import { UserDomain } from 'src/users/domain/entities/user.domain';
import { REPOSITORY_TYPES_USER } from 'src/users/domain/types/repository.types';

@Injectable()
export class UsersFindAllService implements ApplicationService<UserDomain> {
  constructor(
    @Inject(REPOSITORY_TYPES_USER.BaseRepositoryUser)
    private readonly userRepository: BaseRepository<UserDomain>,
  ) {}
  async process() {
    return await this.userRepository.findAll();
  }
}
