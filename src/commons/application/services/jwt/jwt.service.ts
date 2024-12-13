import { Injectable } from '@nestjs/common';
import { JwtService as JWTService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: JWTService) {}
  createJwt(payload: any): string {
    const jwt = this.jwtService.sign(payload);
    return jwt;
  }
}
