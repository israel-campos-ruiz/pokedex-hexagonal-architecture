import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from 'src/auth/application/services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async classicSignIn(@Body() args: any, @Request() req: any) {
    return req.user;
  }
}
