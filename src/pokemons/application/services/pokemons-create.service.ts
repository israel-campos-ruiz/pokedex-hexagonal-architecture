import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ApplicationService } from 'src/commons/domain/application-service';
import { PokemonErrorsMap } from 'src/libs/errors/domain/mapErrors/pokemon-errors.map';
import { CreatePokemonDto } from 'src/pokemons/domain/dto/create-pokemon.dto';
import { PokemonDomain } from 'src/pokemons/domain/entities/Pokemon.domain';
import { REPOSITORY_TYPES } from 'src/pokemons/domain/types/repository.types';
import { BaseRepository } from 'src/pokemons/infraestructure/repositorys/Base.repository';
import { mapFromInfrastructure } from '../mappers/Pokemon.mapper';

@Injectable()
export class PokemonService implements ApplicationService<CreatePokemonDto> {
  constructor(
    @Inject(REPOSITORY_TYPES.BaseRepository)
    private readonly repository: BaseRepository<PokemonDomain>,
  ) {}
  async process(data?: CreatePokemonDto) {
    try {
      const pokemonMapped = mapFromInfrastructure(data);
      return await this.repository.create(pokemonMapped);
    } catch (error) {
      if (error.code === 11000) {
        const errorMapped = PokemonErrorsMap[error.code];
        throw new BadRequestException(errorMapped || 'not found');
      }
    }
  }
}
