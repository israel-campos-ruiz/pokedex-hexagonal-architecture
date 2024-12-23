import { Module } from '@nestjs/common';

import { AuthClassicService } from './application/services/auth-classic.service';
import { AuthController } from './infraestructure/controllers/auth.controller';
import { AuthRepositoryProvider } from './infraestructure/providers/Auth.provider';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthErrorHandler } from './application/services/errors-auth.service';

import { PassportModule } from '@nestjs/passport';
import { JwtService } from 'src/commons/application/services/jwt/jwt.service';
import { LocalStrategy } from './application/strategies/local.strategy';
import { OtpGenerateService } from './application/services/otp-generate.service';
import { SendNotificationModule } from 'src/send-notification/send-notification.module';
import { AuthOtpService } from './application/services/auth-otp.service';
import { OtpStrategy } from './application/strategies/otp.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthClassicService,
    AuthRepositoryProvider,
    AuthErrorHandler,
    LocalStrategy,
    OtpStrategy,
    JwtService,
    OtpGenerateService,
    AuthOtpService,
  ],
  imports: [
    UsersModule,
    SendNotificationModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: '1234',
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
