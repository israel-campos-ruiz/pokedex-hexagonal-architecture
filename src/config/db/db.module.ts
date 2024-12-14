import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoDBModule } from './mongodb/mongodb.module';

@Module({})
export class DbModule {
  static forRoot(): DynamicModule {
    const configService = new ConfigService();
    const dbType = configService.get<string>('DB_TYPE');

    switch (dbType) {
      case 'mongodb':
        return MongoDBModule.forRoot();
      default:
        throw new Error(`Unsupported database type: ${dbType}`);
    }
  }
}
