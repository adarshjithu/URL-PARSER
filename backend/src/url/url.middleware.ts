import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UrlMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const arr = req.originalUrl.split("/")

      
      if (arr.length==2||arr[1]=='auth') {
        return next(); // Skip JWT verification and move to the route handler
      }
     
      const token = req.headers['authorization'];
      

      
      const tokenIsValid = jwt.verify(token, process.env.JWT_SECRET);
      if (!tokenIsValid)
        throw new HttpException(
          'Access Token Expired',
          HttpStatus.UNAUTHORIZED,
        );

      const userId = (tokenIsValid as any).userId;
      req.userId = userId;
      next()
    } catch (error) {
      throw new HttpException('Access Token Expired', HttpStatus.UNAUTHORIZED);
    }
  }
}
