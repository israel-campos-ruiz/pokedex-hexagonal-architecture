import { Provider } from '@nestjs/common';
import { REPOSITORY_TYPES_USER } from 'src/users/domain/types/repository.types';
import { UserMongoRepository } from '../repositorys/User-mongo-db-repository';

export const UserRepositoryProvider: Provider = {
  provide: REPOSITORY_TYPES_USER.BaseRepositoryUser,
  useClass: UserMongoRepository,
};
