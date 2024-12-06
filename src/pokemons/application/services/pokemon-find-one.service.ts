import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationService } from 'src/commons/domain/application-service';
import { PokemonDomain } from 'src/pokemons/domain/entities/Pokemon.domain';
import { REPOSITORY_TYPES } from 'src/pokemons/domain/types/repository.types';
import { BaseRepository } from 'src/pokemons/infraestructure/repositorys/Base.repository';

@Injectable()
export class PokemonFindOneService implements ApplicationService<string> {
  constructor(
    @Inject(REPOSITORY_TYPES.BaseRepository)
    private readonly repository: BaseRepository<
      PokemonDomain | PokemonDomain[]
    >,
  ) {}

  async process(data: string) {
    try {
      const pokemon = await this.repository.findOne(data);
      return pokemon;
    } catch (error) {
      throw new NotFoundException({
        code: 0,
        statusCode: 404,
        message: `Pokemon not found ${error}`,
      });
    }
  }
}
