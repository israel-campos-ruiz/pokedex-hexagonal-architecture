import { Module } from '@nestjs/common';
import { UuidService } from './application/services/uuid/uuid.service';
import { EncryptService } from './application/services/encrypt/encrypt.service';
import { JwtService } from './application/services/jwt/jwt.service';
import { RenderEmailHtmlService } from './application/services/render-email-html/render-email-html.service';
import { OtpEvent } from './application/events/otp.event/otp.event';

@Module({
  providers: [
    UuidService,
    EncryptService,
    JwtService,
    RenderEmailHtmlService,
    OtpEvent,
  ],
  exports: [
    UuidService,
    EncryptService,
    JwtService,
    RenderEmailHtmlService,
    OtpEvent,
  ],
})
export class CommonsModule {}
