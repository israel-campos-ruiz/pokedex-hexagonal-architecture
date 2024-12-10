import { Module } from '@nestjs/common';
import { configLoader } from './config/loaders/config.loader';
import { PokemonsModule } from './pokemons/pokemons.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    configLoader().database.mongoDBConnection(),
    PokemonsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
