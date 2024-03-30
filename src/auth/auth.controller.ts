import { Controller, Get, Post, Body, Res, Param, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(
    @Body() signInDto: authDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    response.cookie('jwtToken', token);
    return { token };
  }

  @Post('signout/:id')
  async signOut(
    @Param('id') id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.signOut(id, response);
    return `user log out ${+id}`;
  }
}
