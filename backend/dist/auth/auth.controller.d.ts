import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(userData: RegisterDto): Promise<{
        success: boolean;
        message: string;
        token: string;
        user: {
            id: unknown;
            username: string;
            email: string;
        };
    }>;
    login(userData: LoginDto): Promise<{
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
