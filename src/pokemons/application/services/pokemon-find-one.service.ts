import { Inject, Injectable } from '@nestjs/common';
import { ApplicationService } from 'src/commons/domain/application-service';
import { REPOSITORY_TYPES } from 'src/pokemons/domain/types/repository.types';
import { BaseRepository } from 'src/pokemons/infraestructure/repositorys/Base.repository';

@Injectable()
export class PokemonFindOneService implements ApplicationService<string> {
  constructor(
    @Inject(REPOSITORY_TYPES.BaseRepository)
    private readonly repository: BaseRepository<string>,
  ) {}

  async process(data: string) {
    try {
      return await this.repository.findOne(data);
    } catch (error) {
      console.log(error);
    }
  }
}
