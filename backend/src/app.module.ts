import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './url/url.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Makes the configuration globally available
    envFilePath: '.env', // Specify the path to your .env file
  }),MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),AuthModule, UrlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
