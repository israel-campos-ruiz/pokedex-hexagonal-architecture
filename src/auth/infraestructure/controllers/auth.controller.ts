import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from 'src/auth/application/services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post()
  async classicSignIn(@Body() args: any) {
    return await this.authService.process(args);
  }
}
