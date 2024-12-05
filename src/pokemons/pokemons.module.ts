import { Module } from '@nestjs/common';
import { PokemonController } from './infraestructure/controllers/pokemons.controller';
import { PokemonService } from './application/services/pokemons.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Pokemon,
  PokemonSchema,
} from './infraestructure/entities/pokemon.entity';
import { PokemonMongoDbRepository } from './infraestructure/repositorys/pokemon-mongo-db.repository';
import { REPOSITORY_TYPES } from './domain/types/repository.types';

@Module({
  controllers: [PokemonController],
  providers: [
    PokemonService,
    PokemonMongoDbRepository,
    {
      provide: REPOSITORY_TYPES.PokemonMongoDbRepository,
      useClass: PokemonMongoDbRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
  ],
})
export class PokemonsModule {}
