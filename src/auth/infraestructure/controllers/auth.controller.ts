import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { OtpGenerateService } from 'src/auth/application/services/otp-generate.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly otpGenerateService: OtpGenerateService) {}
  @UseGuards(LocalAuthGuard)
  @Post()
  async classicSignIn(@Body() args: any, @Request() req: any) {
    return req.user;
  }

  @Post('/create/otp')
  async otpSignIn(@Body() args: any) {
    return await this.otpGenerateService.process(args);
  }
}
