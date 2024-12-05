import {
  Controller,
  // Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { ApiOKResponseSwagger } from 'src/commons/decorators/ApiOkResponseSwagger.decorator';
import { PokemonService } from 'src/pokemons/application/services/pokemons.service';
import { CreatePokemonDto } from 'src/pokemons/domain/dto/create-pokemon.dto';
import { GetPokemonDto } from 'src/pokemons/domain/dto/get-pokemon.dto';
// import { UpdatePokemonDto } from 'src/pokemons/domain/dto/update-pokemon.dto';

ApiOKResponseSwagger('success full response', GetPokemonDto);
@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.process(createPokemonDto);
  }

  // @Get()
  // findAll() {
  //   return this.pokemonService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pokemonService.findOne(+id);
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
