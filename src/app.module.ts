import { Module } from '@nestjs/common';
import { PokemonsModule } from './pokemons/pokemons.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UuidService } from './commons/application/services/uuid/uuid.service';
import { CommonsModule } from './commons/commons.module';
import { EmailModule } from './email/email.module';
import { BattleSimulationModule } from './battle-simulation/battle-simulation.module';
import { DbModule } from './config/db/db.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SendNotificationModule } from './send-notification/send-notification.module';

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
    DbModule.forRoot(),
    EventEmitterModule.forRoot(),
    SendNotificationModule,
  ],
  controllers: [],
  providers: [UuidService],
  exports: [],
})
export class AppModule {}
