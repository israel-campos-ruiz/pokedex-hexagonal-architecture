import { Module } from '@nestjs/common';

import { AuthService } from './application/services/auth.service';
import { AuthController } from './infraestructure/controllers/auth.controller';
import { AuthRepositoryProvider } from './infraestructure/providers/Auth.provider';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthErrorHandler } from './application/services/errors-auth.service';
import { LocalService } from './application/strategies/local.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepositoryProvider,
    AuthErrorHandler,
    LocalService,
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
