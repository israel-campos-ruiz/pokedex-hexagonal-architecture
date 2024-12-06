import { Inject, Injectable } from '@nestjs/common';
import { ApplicationService } from 'src/commons/domain/application-service';
import { PokemonDomain } from 'src/pokemons/domain/entities/Pokemon.domain';
import { REPOSITORY_TYPES } from 'src/pokemons/domain/types/repository.types';
import { BaseRepository } from 'src/pokemons/infraestructure/repositorys/Base.repository';

@Injectable()
export class PokemonDeleteOneService implements ApplicationService<string> {
  constructor(
    @Inject(REPOSITORY_TYPES.BaseRepository)
    private readonly repository: BaseRepository<PokemonDomain>,
  ) {}
  async process(data?: string) {
    return await this.repository.deleteOne(data);
  }
}
