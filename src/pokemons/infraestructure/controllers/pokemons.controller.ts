import {
  Controller,
  // Get,
  Post,
  Body,
  Get,
  Param,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { ApiOKResponseSwagger } from 'src/commons/decorators/ApiOkResponseSwagger.decorator';
import { PokemonFindOneService } from 'src/pokemons/application/services/pokemon-find-one.service';
import { PokemonService } from 'src/pokemons/application/services/pokemons-create.service';
import { CreatePokemonDto } from 'src/pokemons/domain/dto/create-pokemon.dto';
import { GetPokemonDto } from 'src/pokemons/domain/dto/get-pokemon.dto';
// import { UpdatePokemonDto } from 'src/pokemons/domain/dto/update-pokemon.dto';

ApiOKResponseSwagger('success full response', GetPokemonDto);
@Controller('pokemons')
export class PokemonController {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly pokemonServiceFindOne: PokemonFindOneService,
  ) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.process(createPokemonDto);
  }
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonServiceFindOne.process(term);
  }

  // @Get()
  // findAll() {
  //   return this.pokemonService.findAll();
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
  //   return this.pokemonService.update(+id, updatePokemonDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pokemonService.remove(+id);
  // }
}
