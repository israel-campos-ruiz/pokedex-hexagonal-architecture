import { Provider } from '@nestjs/common';

import { AuthMongoRepository } from '../repositorys/Auth-mongo-db-repository';
import { REPOSITORY_TYPES_AUTH } from 'src/auth/domain/types/repository.types';

export const AuthRepositoryProvider: Provider = {
  provide: REPOSITORY_TYPES_AUTH.BaseRepositoryAuth,
  useClass: AuthMongoRepository,
};
