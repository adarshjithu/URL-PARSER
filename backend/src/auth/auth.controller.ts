import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() userData: RegisterDto) {
    return this.authService.registerUser(userData);
  }

  @Post('login')
  login(@Body() userData: LoginDto) {
    return this.authService.loginUser(userData);
  }
}
