import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ApplicationService } from 'src/commons/domain/application-service';
import { UpdatePokemonDto } from 'src/pokemons/domain/dto/update-pokemon.dto';
import { REPOSITORY_TYPES } from 'src/pokemons/domain/types/repository.types';
import { BaseRepository } from 'src/pokemons/infraestructure/repositorys/Base.repository';

@Injectable()
export class PokemonUpdateOneService
  implements ApplicationService<UpdatePokemonDto>
{
  constructor(
    @Inject(REPOSITORY_TYPES.BaseRepository)
    private readonly repository: BaseRepository<UpdatePokemonDto>,
  ) {}
  async process(data: UpdatePokemonDto, id?: string) {
    try {
      return await this.repository.updateOne(data, id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
