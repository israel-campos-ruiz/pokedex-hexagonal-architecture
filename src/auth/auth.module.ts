import { Module } from '@nestjs/common';

import { AuthService } from './application/services/auth.service';
import { AuthController } from './infraestructure/controllers/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
