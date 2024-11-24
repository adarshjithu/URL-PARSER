"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let UrlMiddleware = class UrlMiddleware {
    async use(req, Response, next) {
        try {
            if (req.originalUrl.split("/").length > 1) {
                return next();
            }
            const token = req.headers['authorization'];
            const tokenIsValid = jwt.verify(token, process.env.JWT_SECRET);
            if (!tokenIsValid)
                throw new common_1.HttpException('Access Token Expired', common_1.HttpStatus.UNAUTHORIZED);
            const userId = tokenIsValid.userId;
            req.userId = userId;
            next();
        }
        catch (error) {
            throw new common_1.HttpException('Access Token Expired', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
exports.UrlMiddleware = UrlMiddleware;
exports.UrlMiddleware = UrlMiddleware = __decorate([
    (0, common_1.Injectable)()
], UrlMiddleware);
//# sourceMappingURL=url.middleware.js.map