import { Module } from '@nestjs/common';
import { PokemonsModule } from './pokemons/pokemons.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UuidService } from './commons/application/services/uuid/uuid.service';
import { CommonsModule } from './commons/commons.module';
import { EmailModule } from './email/email.module';
import { BattleSimulationModule } from './battle-simulation/battle-simulation.module';
import { SendMailModule } from './send-mail/send-mail.module';
import { DbModule } from './config/db/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    PokemonsModule,
    AuthModule,
    UsersModule,
    CommonsModule,
    EmailModule,
    BattleSimulationModule,
    SendMailModule,
    DbModule.forRoot(),
  ],
  controllers: [],
  providers: [UuidService],
  exports: [],
})
export class AppModule {}
