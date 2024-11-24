import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './auth.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userModel;
    private readonly JwtService;
    constructor(userModel: Model<User>, JwtService: JwtService);
    private readonly salt;
    hashPassword(password: string): Promise<string>;
    comparePassword(curPassword: string, oldPassword: string): Promise<boolean>;
    registerUser(userData: RegisterDto): Promise<{
        success: boolean;
        message: string;
        token: string;
        user: {
            id: unknown;
            username: string;
            email: string;
        };
    }>;
    loginUser(userData: LoginDto): Promise<{
        success: boolean;
        message: string;
        token: string;
        user: {
            id: unknown;
            username: string;
            email: string;
            token: string;
        };
    }>;
}
