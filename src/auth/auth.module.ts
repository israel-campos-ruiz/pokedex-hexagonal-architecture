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

@Module({
  controllers: [AuthController],
  providers: [
    AuthClassicService,
    AuthRepositoryProvider,
    AuthErrorHandler,
    LocalStrategy,
    JwtService,
    OtpGenerateService,
  ],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: '1234',
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
