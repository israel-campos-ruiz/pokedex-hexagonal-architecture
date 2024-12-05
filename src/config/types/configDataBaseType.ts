import { DynamicModule } from '@nestjs/common';

export type DataBaseConfigType = {
  username: string;
  password: string;
  mongoDBConnection: () => DynamicModule;
};
