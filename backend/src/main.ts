import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  const corsOptions = {
    origin: 'https://orgafile.com',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(9010);
}
bootstrap();
