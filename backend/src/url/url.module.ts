import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './url.schema';
import { JwtModule } from '@nestjs/jwt';
import { UrlMiddleware } from './url.middleware';

@Module({
  imports:[  JwtModule.register({
    secret: process.env.JWT_SECRET || 'MYSECRET', 
    signOptions: { expiresIn: '1h' }, 
  }),MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),],

  controllers: [UrlController],

  providers: [UrlService]
})
export class UrlModule implements NestModule {
 configure(consumer: MiddlewareConsumer) {
   consumer.apply(UrlMiddleware).forRoutes('url')
 }

}
