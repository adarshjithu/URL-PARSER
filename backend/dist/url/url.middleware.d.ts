import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
export declare class UrlMiddleware implements NestMiddleware {
    use(req: Request, Response: any, next: NextFunction): Promise<void>;
}
