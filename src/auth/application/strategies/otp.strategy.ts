import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { AuthOtpService } from '../services/auth-otp.service';
import { Request } from 'express';

@Injectable()
export class OtpStrategy extends PassportStrategy(Strategy, 'otp-strategy') {
  constructor(private readonly authOtpService: AuthOtpService) {
    super();
  }
  async validate(req: Request): Promise<any> {
    const otp = req.body.otp;
    const user = await this.authOtpService.process(otp);
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }
    return user;
  }
}
