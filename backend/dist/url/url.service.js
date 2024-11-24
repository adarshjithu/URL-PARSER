"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const url_schema_1 = require("./url.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
let UrlService = class UrlService {
    constructor(urlModel, JwtService) {
        this.urlModel = urlModel;
        this.JwtService = JwtService;
    }
    async genShortUrl() {
        const random = Math.random().toString(36).substring(2, 7);
        return random.substring(0, 5);
    }
    async generateShortUrl(url, userId) {
        const shortUrl = await this.genShortUrl();
        const isUrlExists = await this.urlModel.findOne({ url: url });
        if (isUrlExists) {
            return isUrlExists;
        }
        const newUrl = new this.urlModel({
            url: url,
            userId: userId,
            shortUrl: `${process.env.BASE_URL}/${shortUrl}`,
        });
        await newUrl.save();
        return newUrl;
    }
    async findUrlData(id) {
        const url = await this.urlModel.findOne({
            shortUrl: `${process.env.BASE_URL}/url/${id}`,
        });
        if (url) {
            return { success: true, url: url?.url };
        }
        else {
            return { success: false };
        }
    }
    async findUrlsById(userId) {
        const res = await this.urlModel.find({ userId });
        return res;
    }
    async deleteUrlData(url) {
        await this.urlModel.deleteOne({ url: url });
        return { success: true };
    }
};
exports.UrlService = UrlService;
exports.UrlService = UrlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(url_schema_1.Url.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], UrlService);
//# sourceMappingURL=url.service.js.map