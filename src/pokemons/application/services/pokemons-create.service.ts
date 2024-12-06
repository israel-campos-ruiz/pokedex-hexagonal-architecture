import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ApplicationService } from 'src/commons/domain/application-service';
import { PokemonErrorsMap } from 'src/libs/errors/domain/mapErrors/pokemon-errors.map';
import { CreatePokemonDto } from 'src/pokemons/domain/dto/create-pokemon.dto';
import { PokemonDomain } from 'src/pokemons/domain/entities/Pokemon.domain';
import { REPOSITORY_TYPES } from 'src/pokemons/domain/types/repository.types';
import { BaseRepository } from 'src/pokemons/infraestructure/repositorys/Base.repository';

@Injectable()
export class PokemonService implements ApplicationService<CreatePokemonDto> {
  constructor(
    @Inject(REPOSITORY_TYPES.BaseRepository)
    private readonly repository: BaseRepository<PokemonDomain>,
  ) {}
  async process(data?: CreatePokemonDto) {
    try {
      return await this.repository.create(data);
    } catch (error) {
      if (error.code === 11000) {
        const errorMapped = PokemonErrorsMap[error.code];
        throw new BadRequestException(errorMapped || 'not found');
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
