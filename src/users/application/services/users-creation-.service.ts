import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EncryptService } from 'src/commons/application/services/encrypt/encrypt.service';
import { UuidService } from 'src/commons/application/services/uuid/uuid.service';
import { ApplicationService } from 'src/commons/domain/application-service';
import { PokemonErrorsMap } from 'src/libs/errors/domain/mapErrors/pokemon-errors.map';
import { CreateUserDto } from 'src/users/domain/dto/create-user.dto';
import { UserDomain } from 'src/users/domain/entities/user.domain';
import { REPOSITORY_TYPES_USER } from 'src/users/domain/types/repository.types';
import { BaseUserRepository } from 'src/users/infrastructure/repositorys/Base-user-respository';

@Injectable()
export class UsersCreationService implements ApplicationService<CreateUserDto> {
  private readonly NUM_SALT = 10;
  constructor(
    @Inject(REPOSITORY_TYPES_USER.BaseRepositoryUser)
    private readonly repository: BaseUserRepository<UserDomain>,
    private readonly uuidService: UuidService,
    private readonly encryptService: EncryptService,
  ) {}
  async process(data?: CreateUserDto) {
    const encryptedPassWord = await this.encryptService.generateEncryption(
      data.password,
      this.NUM_SALT,
    );
    try {
      const user = new UserDomain({
        name: data.name,
        email: data.email,
        password: encryptedPassWord,
        userId: this.uuidService.createID(),
        pokemon: data.pokemon || [],
      });
      return await this.repository.create(user);
    } catch (error) {
      const errorMapped = PokemonErrorsMap[error.code];
      throw new BadRequestException(errorMapped || 'not found');
    }
  }
}
