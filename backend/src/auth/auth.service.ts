import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './auth.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly JwtService:JwtService) {}

  private readonly salt = 10;

  async hashPassword(password: string): Promise<string> {
    const saltRound = await bcrypt.genSalt(this.salt);
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  }

  async comparePassword(curPassword:string,oldPassword:string):Promise<boolean>{
    return await bcrypt.compare(curPassword,oldPassword)
  }


  // Register User
  async registerUser(userData: RegisterDto) {
    // Check if the email already exists
    const isUserExist = await this.userModel.findOne({ email: userData.email });
    if (isUserExist) {
      throw new HttpException('Email Already Exists', HttpStatus.BAD_REQUEST);
    }

    // Hash the password
    const hashedPassword = await this.hashPassword(userData.password);

    // Create a new user instance
    const userObj = new this.userModel({
      username: userData.username,
      password: hashedPassword,
      email: userData.email,
    });

    // Save the user to the database
    await userObj.save();

    // Prepare JWT payload
    const payload = { userId: userObj._id, username: userObj.username };

    // Generate access token
    const accessToken = this.JwtService.sign(payload);

    // Return success response
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


  async loginUser(userData: LoginDto) {
    

    const user = await this.userModel.findOne({email:userData?.email});
   if(!user) throw new HttpException("Invalid User",HttpStatus.BAD_REQUEST)

    
    const isPasswordMatch = await this.comparePassword(userData?.password,user?.password)
    if(!isPasswordMatch) throw new HttpException("Invalid Password",HttpStatus.BAD_REQUEST);

    const payload = { userId: user._id, username: user.username };

    // Generate access token
    const accessToken = this.JwtService.sign(payload);
    return {
      success: true,
      message: 'User Authentication Successful',
      token: accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        token:accessToken
      }, 
    };
    }

  }

