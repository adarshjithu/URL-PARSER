import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Url } from './url.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { IUrl } from './Interface/IUrl';
import { url } from 'inspector';
@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name) private urlModel: Model<Url>,
    private readonly JwtService: JwtService,
  ) {}

  async genShortUrl() {
    const timestamp = Date.now(); // Current timestamp
    const random = Math.random().toString(36).substring(2, 10); // Generate a 6-character random string
    const shortUrl = (timestamp.toString(36).substring(4) + random).substring(
      0,
      10,
    ); // Combine and limit to 8 chars
    return shortUrl;
  }

  async generateShortUrl(
    url: string,
    userId: string,
  ): Promise<Record<string, any>> {
    const shortUrl = await this.genShortUrl();

    const isUrlExists = await this.urlModel.findOne({ url: url });
    if (isUrlExists) {
      return isUrlExists;
    }
    const newUrl = new this.urlModel({
      url: url,
      userId: userId,
      shortUrl: `${process.env.BASE_URL}/url/${shortUrl}`,
    });
    await newUrl.save();
    return newUrl;
  }

  async findUrlData(id: string): Promise<{ success: boolean; url?: string }> {
    const url = await this.urlModel.findOne({
      shortUrl: `${process.env.BASE_URL}/url/${id}`,
    });
    if (url) {
      return { success: true, url: url?.url };
    } else {
      return { success: false };
    }
  }

  async findUrlsById(userId: string): Promise<Partial<IUrl>[]> {
    const res = await this.urlModel.find({ userId });
    return res;
  }
  async deleteUrlData(url: string) {
    await this.urlModel.deleteOne({ url: url });
    return { success: true };
  }
}
