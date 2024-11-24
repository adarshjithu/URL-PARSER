import { Url } from './url.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { IUrl } from './Interface/IUrl';
export declare class UrlService {
    private urlModel;
    private readonly JwtService;
    constructor(urlModel: Model<Url>, JwtService: JwtService);
    genShortUrl(): Promise<string>;
    generateShortUrl(url: string, userId: string): Promise<Record<string, any>>;
    findUrlData(id: string): Promise<{
        success: boolean;
        url?: string;
    }>;
    findUrlsById(userId: string): Promise<Partial<IUrl>[]>;
    deleteUrlData(url: string): Promise<{
        success: boolean;
    }>;
}
