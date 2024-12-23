import { Module } from '@nestjs/common';
import { UuidService } from './application/services/uuid/uuid.service';
import { EncryptService } from './application/services/encrypt/encrypt.service';
import { JwtService } from './application/services/jwt/jwt.service';
import { RenderEmailHtmlService } from './application/services/render-email-html/render-email-html.service';

@Module({
  providers: [UuidService, EncryptService, JwtService, RenderEmailHtmlService],
  exports: [UuidService, EncryptService, JwtService, RenderEmailHtmlService],
})
export class CommonsModule {}
