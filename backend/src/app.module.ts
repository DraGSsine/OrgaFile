import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DashboardModule } from './dashboard/dashboard.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { FoldersModule } from './folders/folders.module';
// import { FoldersModule } from './folders/folders.module';
import { PaymentsModule } from './payments/payments.module';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),AuthModule,MongooseModule.forRoot("mongodb+srv://dragssine:Jvunu5pgBA2FsBou@fleeso.j7mpc5c.mongodb.net/doctify?retryWrites=true&w=majority&appName=fleeso/"), DashboardModule, UploadModule, UserModule,FoldersModule, PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
