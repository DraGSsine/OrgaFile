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
import { TestsModule } from './tests/tests.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    DashboardModule,
    UploadModule,
    UserModule,
    FoldersModule,
    PaymentsModule,
    TestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
