import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule,MongooseModule.forRoot("mongodb+srv://dragssine:O2eIhQcWxYNp7QeT@cluster0.dou2yft.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
