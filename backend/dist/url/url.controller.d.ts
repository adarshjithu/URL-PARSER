import { UrlService } from './url.service';
import { UrlDto } from './dtos/url.dto';
import { Request, Response } from 'express';
export interface CustomRequest extends Request {
    userId: string;
}
export declare class UrlController {
    private urlService;
    constructor(urlService: UrlService);
    generateShorUrl(urlData: UrlDto, req: CustomRequest): Promise<Record<string, any>>;
    getUrlById(id: string, res: Response): Promise<void>;
    getUserUrls(req: Request): Promise<Partial<import("./Interface/IUrl").IUrl>[]>;
    deleteUrl(url: string): Promise<{
        success: boolean;
    }>;
}
