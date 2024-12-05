import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ApplicationService } from 'src/commons/domain/application-service';
import { CreatePokemonDto } from 'src/pokemons/domain/dto/create-pokemon.dto';
import { REPOSITORY_TYPES } from 'src/pokemons/domain/types/repository.types';
import { PokemonMongoDbRepository } from 'src/pokemons/infraestructure/repositorys/pokemon-mongo-db.repository';

@Injectable()
export class PokemonService implements ApplicationService<CreatePokemonDto> {
  constructor(
    @Inject(REPOSITORY_TYPES.PokemonMongoDbRepository)
    private readonly repository: PokemonMongoDbRepository,
  ) {}
  async process(data?: CreatePokemonDto) {
    try {
      return await this.repository.create(data);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException();
      }
    }
  }
  // create(createPokemonDto: CreatePokemonDto) {
  //   return createPokemonDto;
  // }

  // findAll() {
  //   return `This action returns all pokemons`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} pokemon`;
  // }

  // update(id: number, updatePokemonDto: UpdatePokemonDto) {
  //   return `This action updates a #${id} pokemon ${updatePokemonDto}`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} pokemon`;
  // }
}
