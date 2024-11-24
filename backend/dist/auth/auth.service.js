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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_schema_1 = require("./auth.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, JwtService) {
        this.userModel = userModel;
        this.JwtService = JwtService;
        this.salt = 10;
    }
    async hashPassword(password) {
        const saltRound = await bcrypt.genSalt(this.salt);
        const hashedPassword = await bcrypt.hash(password, saltRound);
        return hashedPassword;
    }
    async comparePassword(curPassword, oldPassword) {
        return await bcrypt.compare(curPassword, oldPassword);
    }
    async registerUser(userData) {
        const isUserExist = await this.userModel.findOne({ email: userData.email });
        if (isUserExist) {
            throw new common_1.HttpException('Email Already Exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await this.hashPassword(userData.password);
        const userObj = new this.userModel({
            username: userData.username,
            password: hashedPassword,
            email: userData.email,
        });
        await userObj.save();
        const payload = { userId: userObj._id, username: userObj.username };
        const accessToken = this.JwtService.sign(payload);
        return {
            success: true,
            message: 'User Authentication Successful',
            token: accessToken,
            user: {
                id: userObj._id,
                username: userObj.username,
                email: userObj.email,
            },
        };
    }
    async loginUser(userData) {
        const user = await this.userModel.findOne({ email: userData?.email });
        if (!user)
            throw new common_1.HttpException("Invalid User", common_1.HttpStatus.BAD_REQUEST);
        const isPasswordMatch = await this.comparePassword(userData?.password, user?.password);
        if (!isPasswordMatch)
            throw new common_1.HttpException("Invalid Password", common_1.HttpStatus.BAD_REQUEST);
        const payload = { userId: user._id, username: user.username };
        const accessToken = this.JwtService.sign(payload);
        return {
            success: true,
            message: 'User Authentication Successful',
            token: accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                token: accessToken
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(auth_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map