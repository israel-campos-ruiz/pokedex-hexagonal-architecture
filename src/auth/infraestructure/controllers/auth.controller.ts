import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { OtpGenerateService } from 'src/auth/application/services/otp-generate.service';
import { SendEmailNotificationService } from 'src/send-notification/application/send-email-notification.service';
import { OtpAuthGuard } from '../guards/otp-auth.guard';
import { Request as RequestExpress } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly otpGenerateService: OtpGenerateService,
    private readonly sendNotification: SendEmailNotificationService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post()
  async classicSignIn(@Body() args: any, @Request() req: RequestExpress) {
    return req.user;
  }

  @Post('/create/otp')
  async otpGeneration(@Body() args: any) {
    const generatedOTP = await this.otpGenerateService.process(args);
    await this.sendNotification.process(args);
    return generatedOTP;
  }

  @Post('/otp')
  @UseGuards(OtpAuthGuard)
  async otpSignIn(@Request() req: RequestExpress) {
    return req.user;
  }
}
