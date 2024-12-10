import { REPOSITORY_TYPES } from 'src/pokemons/domain/types/repository.types';
import { PokemonMongoDbRepository } from '../repositorys/pokemon-mongo-db.repository';
import { Provider } from '@nestjs/common';

export const PokemonRepositoryProvider: Provider = {
  provide: REPOSITORY_TYPES.BaseRepository,
  useClass: PokemonMongoDbRepository,
};
