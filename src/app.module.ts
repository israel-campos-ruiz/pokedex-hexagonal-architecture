import { Module } from '@nestjs/common';
import { configLoader } from './config/loaders/config.loader';
import { PokemonsModule } from './pokemons/pokemons.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UuidService } from './commons/application/services/uuid/uuid.service';
import { CommonsModule } from './commons/commons.module';
import { EmailModule } from './email/email.module';
import { BattleSimulationModule } from './battle-simulation/battle-simulation.module';
import { SendMailModule } from './send-mail/send-mail.module';

@Module({
  imports: [
    configLoader().database.mongoDBConnection(),
    PokemonsModule,
    AuthModule,
    UsersModule,
    CommonsModule,
    EmailModule,
    BattleSimulationModule,
    SendMailModule,
  ],
  controllers: [],
  providers: [UuidService],
  exports: [],
})
export class AppModule {}
