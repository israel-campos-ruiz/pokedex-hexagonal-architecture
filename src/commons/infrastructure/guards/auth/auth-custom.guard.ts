import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthCustomGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  private setUnauthorizedException(text: string) {
    throw new UnauthorizedException(text);
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['Authorization'];
    if (!authorizationHeader) {
      this.setUnauthorizedException(`Authorization header not found`);
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      this.setUnauthorizedException(`Token not found`);
    }

    try {
      const payload = this.jwtService.verify(token, { secret: '1234' });
      request.user = payload;
      return true;
    } catch (error) {
      console.log(error);
      this.setUnauthorizedException(`Invalid or expired token`);
    }
    return true;
  }
}
