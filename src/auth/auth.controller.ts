import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(@Body() signInDto: authDto) {
    console.log('auth sign in controller');
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
