import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, response } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    let token = await this.jwtService.signAsync(payload);
    return token;
  }

  async signOut(id: number, response: Response) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      return 'you are not valid user';
    }
    return response.clearCookie('jwtToken');
  }
}
