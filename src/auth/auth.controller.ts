/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.register(CreateUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.authService.validateUser(req.user.sub);
  }

  @Get('users')
  async getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Post('request-reset-password')
  async requestResetPassword(@Body('email') email: string) {
    return this.authService.resetUserPasswordRequest({ email });
  }

  @Get('verify-reset-password-token')
  async verifyResetPasswordToken(@Query('token') token: string) {
    return this.authService.verifyResetPasswordToken({ token });
  }

  @Post('reset-password')
  async resetUserPassword(@Body() resetPasswordDto: ResetUserPasswordDto) {
    return this.authService.resetUserPassword({ resetPasswordDto });
  }
}
