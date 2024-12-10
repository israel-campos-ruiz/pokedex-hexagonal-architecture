import { Module } from '@nestjs/common';
import { configLoader } from './config/loaders/config.loader';
import { PokemonsModule } from './pokemons/pokemons.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UuidService } from './commons/application/services/uuid/uuid.service';
import { CommonsModule } from './commons/commons.module';

@Module({
  imports: [
    configLoader().database.mongoDBConnection(),
    PokemonsModule,
    AuthModule,
    UsersModule,
    CommonsModule,
  ],
  controllers: [],
  providers: [UuidService],
  exports: [],
})
export class AppModule {}
