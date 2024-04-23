import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DashboardModule } from './dashboard/dashboard.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),AuthModule,MongooseModule.forRoot("mongodb+srv://dragssine:Jvunu5pgBA2FsBou@fleeso.j7mpc5c.mongodb.net/?retryWrites=true&w=majority&appName=fleeso/"), DashboardModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
