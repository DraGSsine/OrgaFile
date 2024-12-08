import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(9010);
}
bootstrap();
