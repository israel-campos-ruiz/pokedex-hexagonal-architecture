import { Injectable } from '@nestjs/common';
import { BaseRepository } from './Base.repository';
import { Pokemon } from '../entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePokemonDto } from 'src/pokemons/domain/dto/create-pokemon.dto';
import { createPokemonQuery } from '../mongoDbQuerys/mongoQuerys';
import { mapFromInfrastructure } from 'src/pokemons/domain/mappers/Pokemon.mapper';
@Injectable()
export class PokemonMongoDbRepository extends BaseRepository<Pokemon> {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {
    super();
  }
  //   async create(entity: CreatePokemonDto): Promise<Pokemon> { with mongoose
  //     const createdPokemon = await this.pokemonModel.create(entity);
  //     console.log(createdPokemon);
  //     return createdPokemon;
  //   }
  // with mongodb native
  async create(entity: CreatePokemonDto): Promise<Pokemon> {
    const database = this.pokemonModel.db.db;
    const pokemonMapped = mapFromInfrastructure(entity) as Pokemon;
    const result = await createPokemonQuery(database, pokemonMapped);
    return result as Pokemon;
  }
}
