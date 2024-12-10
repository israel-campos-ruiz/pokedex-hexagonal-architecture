import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class EncryptService {
  public async generateEncryption(
    password: string,
    salt: number,
  ): Promise<string> {
    console.log(password);
    return await bcrypt.hash(password, salt);
  }
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
