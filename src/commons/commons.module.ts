import { Module } from '@nestjs/common';
import { UuidService } from './application/services/uuid/uuid.service';
import { EncryptService } from './application/services/encrypt/encrypt.service';

@Module({
  providers: [UuidService, EncryptService],
  exports: [UuidService, EncryptService],
})
export class CommonsModule {}
