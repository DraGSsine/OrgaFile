import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const options = {
    allowedHeaders: '*',
    origin: '*',
    credentials: false,
  };
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.enableCors(options);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(9010);
}
bootstrap();
