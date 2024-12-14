import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthClassicService } from '../services/auth-classic.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthClassicService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.process({ email, password });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
  }
}
