import { Body, Controller, Delete, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlDto } from './dtos/url.dto';
import { Request, Response } from 'express';
export interface CustomRequest extends Request {
  userId: string;
}

@Controller()
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post()
  async generateShorUrl(@Body() urlData: UrlDto, @Req() req: CustomRequest) {
    return await this.urlService.generateShortUrl(urlData?.url, req.userId);
  }

  @Get(':id')
  async getUrlById(@Param('id') id: string, @Res() res: Response) {
    const urlData = await this.urlService.findUrlData(id);
    if (urlData?.success) {
      res.redirect(urlData?.url);
    } else {
      res.redirect(process.env.FRONTEND_URL);
    }
  }


  @Get()
  async getUserUrls(@Req() req: Request) {
    return await this.urlService.findUrlsById(req.userId);
  }
  @Delete()
  async deleteUrl(@Query('url') url:string) {
     return await this.urlService.deleteUrlData(url)
  }
}
