import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiOKResponseSwagger } from 'src/commons/decorators/ApiOkResponseSwagger.decorator';
import { MongoDbFindParametersPipe } from 'src/pokemons/application/pipes/mongo-db-find-parameters.pipe';
import { PokemonDeleteOneService } from 'src/pokemons/application/services/pokemon-delete-one.service';
import { PokemonFindAllService } from 'src/pokemons/application/services/pokemon-find-all.service';
import { PokemonFindOneService } from 'src/pokemons/application/services/pokemon-find-one.service';
import { PokemonUpdateOneService } from 'src/pokemons/application/services/pokemon-update-one.service';
import { PokemonService } from 'src/pokemons/application/services/pokemons-create.service';
import { CreatePokemonDto } from 'src/pokemons/domain/dto/create-pokemon.dto';
import { GetPokemonDto } from 'src/pokemons/domain/dto/get-pokemon.dto';
import { UpdatePokemonDto } from 'src/pokemons/domain/dto/update-pokemon.dto';
// import { UpdatePokemonDto } from 'src/pokemons/domain/dto/update-pokemon.dto';

ApiOKResponseSwagger('success full response', GetPokemonDto);
@Controller('pokemons')
export class PokemonController {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly pokemonServiceFindOne: PokemonFindOneService,
    private readonly pokemonServiceFindAll: PokemonFindAllService,
    private readonly pokemonServiceUpdateOne: PokemonUpdateOneService,
    private readonly pokemonDeleteOneService: PokemonDeleteOneService,
  ) {}

  @Get()
  findAll() {
    return this.pokemonServiceFindAll.process();
  }
  @Get(':term')
  findOne(@Param('term', MongoDbFindParametersPipe) term: any) {
    return this.pokemonServiceFindOne.process(term);
  }
  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.process(createPokemonDto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonServiceUpdateOne.process(updatePokemonDto, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonDeleteOneService.process(id);
  }
}
