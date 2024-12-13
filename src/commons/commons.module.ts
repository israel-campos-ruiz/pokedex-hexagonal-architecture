import { Module } from '@nestjs/common';
import { UuidService } from './application/services/uuid/uuid.service';
import { EncryptService } from './application/services/encrypt/encrypt.service';
import { JwtService } from './application/services/jwt/jwt.service';

@Module({
  providers: [UuidService, EncryptService, JwtService],
  exports: [UuidService, EncryptService, JwtService],
})
export class CommonsModule {}
