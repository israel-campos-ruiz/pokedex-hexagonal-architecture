import { Module } from '@nestjs/common';
import { configLoader } from './config/loaders/config.loader';
import { PokemonsModule } from './pokemons/pokemons.module';

@Module({
  imports: [configLoader().database.mongoDBConnection(), PokemonsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
