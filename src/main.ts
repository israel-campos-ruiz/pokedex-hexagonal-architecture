/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('poke app first hexagonal try.')
    .setDescription('doc of poke api with hexagonal architecture.')
    .setVersion('1.0')
    .build();
  app.setGlobalPrefix('api/v1');
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.reduce((acc, error) => {
          const fieldErrors = Object.entries(error.constraints || {}).reduce(
            (fieldAcc, [key, message]) => ({
              ...fieldAcc,
              [error.property]: message,
            }),
            {},
          );
          return {
            ...acc,
            [error.property]: fieldErrors,
          };
        }, {});

        throw new BadRequestException({
          ...formattedErrors,
          error: 'Bad Request',
          statusCode: 400,
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
