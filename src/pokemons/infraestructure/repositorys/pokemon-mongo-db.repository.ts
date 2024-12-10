import { Injectable } from '@nestjs/common';
import { BaseRepository } from './Base.repository';
import { Pokemon } from '../entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePokemonDto } from 'src/pokemons/domain/dto/create-pokemon.dto';
import {
  createPokemonQuery,
  deleteOnePokemon,
  findAllPokemon,
  findPokemonByDifferentParams,
  updateOnePokemon,
} from '../mongoDbQuerys/mongoQuerys';
import { ObjectId } from 'mongodb';

@Injectable()
export class PokemonMongoDbRepository implements BaseRepository<Pokemon> {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}
  // * this is with the mongoose approach
  //   async create(entity: CreatePokemonDto): Promise<Pokemon> {
  //     const createdPokemon = await this.pokemonModel.create(entity);
  //     console.log(createdPokemon);
  //     return createdPokemon;
  //   }

  // * with mongodb native
  async create(entity: CreatePokemonDto): Promise<Pokemon> {
    const database = this.pokemonModel.db.db;
    const result = await createPokemonQuery(database, entity);
    const pokemon = new this.pokemonModel(result);
    return pokemon;
  }
  async findOne(entity: string): Promise<Pokemon> {
    const database = this.pokemonModel.db.db;
    const result = await findPokemonByDifferentParams(database, entity);
    const singlePokemonSearch = result[0] as unknown as Pokemon;
    const multiplePokemonSearch = result as unknown as Pokemon;
    if (ObjectId.isValid(entity)) {
      return singlePokemonSearch;
    }
    if (typeof entity === 'number') {
      return singlePokemonSearch;
    }
    return multiplePokemonSearch;
  }

  async findAll(): Promise<Pokemon[]> {
    const database = this.pokemonModel.db.db;
    const pokemonResult = await findAllPokemon(database);
    return pokemonResult as unknown as Pokemon[];
  }

  async updateOne(entity: Pokemon, id: string): Promise<Pokemon> {
    const database = this.pokemonModel.db.db;
    const pokemonResult = await updateOnePokemon(database, entity, id);
    return pokemonResult as unknown as Pokemon;
  }
  async deleteOne(id: string) {
    const database = this.pokemonModel.db.db;
    await deleteOnePokemon(database, id);
    return {
      ok: true,
      status: 201,
      message: 'Pokemon deleted correctly',
    } as any;
  }
}
