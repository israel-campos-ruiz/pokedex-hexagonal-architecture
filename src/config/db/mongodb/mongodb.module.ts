import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({})
export class MongoDBModule {
  static forRoot(): DynamicModule {
    return {
      module: MongoDBModule,
      imports: [
        MongooseModule.forRootAsync({
          useFactory: (configService: ConfigService) => {
            const password = configService.get<string>('DB_PASSWORD');
            const username = configService.get<string>('DB_USERNAME');
            const host = configService.get<string>('DB_HOST');
            const port = configService.get<number>('DB_PORT');
            const authSource = configService.get<string>('DB_AUTH_SOURCE');
            const dbName = configService.get<string>('DB_NAME');
            const uri = `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=${authSource}`;
            console.log('MongoDB URI:', uri);
            return { uri };
          },
          inject: [ConfigService],
        }),
      ],
      exports: [MongooseModule],
    };
  }
}
