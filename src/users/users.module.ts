import { Module } from '@nestjs/common';

import { UsersController } from './infrastructure/controllers/users.controller';
import { UsersCreationService } from './application/services/users-creation-.service';
import { UserRepositoryProvider } from './infrastructure/providers/User.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/entities/User.entity';
import { CommonsModule } from 'src/commons/commons.module';
import { UsersFindAllService } from './application/services/users-find-all.service';
import { FindOneService } from './application/services/find-one.service';
import { REPOSITORY_TYPES_USER } from './domain/types/repository.types';
import OtpListenerService from './application/listeners/otp-listener.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersCreationService,
    UserRepositoryProvider,
    UsersFindAllService,
    FindOneService,
    OtpListenerService,
  ],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CommonsModule,
  ],
  exports: [MongooseModule, REPOSITORY_TYPES_USER.BaseRepositoryUser],
})
export class UsersModule {}
