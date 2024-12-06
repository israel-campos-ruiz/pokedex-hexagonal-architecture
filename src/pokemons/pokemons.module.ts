import { Module } from '@nestjs/common';

import { PokemonService } from './application/services/pokemons-create.service';
import { MongooseModule } from '@nestjs/mongoose';

import { REPOSITORY_TYPES } from './domain/types/repository.types';
import { PokemonFindOneService } from './application/services/pokemon-find-one.service';
import { PokemonController } from './infraestructure/controllers/pokemons.controller';
import {
  Pokemon,
  PokemonSchema,
} from './infraestructure/entities/pokemon.entity';
import { PokemonMongoDbRepository } from './infraestructure/repositorys/pokemon-mongo-db.repository';

@Module({
  controllers: [PokemonController],
  providers: [
    PokemonService,
    PokemonMongoDbRepository,
    {
      provide: REPOSITORY_TYPES.BaseRepository,
      useClass: PokemonMongoDbRepository,
    },
    PokemonFindOneService,
  ],
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
  ],
})
export class PokemonsModule {}
