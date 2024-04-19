import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),AuthModule,MongooseModule.forRoot("mongodb+srv://dragssine:kefm4SaVfSxJ3a64@cluster0.dou2yft.mongodb.net/"), DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
