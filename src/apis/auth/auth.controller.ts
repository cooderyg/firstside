import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { DynamicAuthGuard } from './guard/dynamic-auth.guard-04';

interface IOAuthUser {
  user: {
    name: string;
    email: string;
    password: string;
    age: number;
  };
}

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService, //
    private readonly authService: AuthService,
  ) {}

  @Get('/login/:social')
  @UseGuards(DynamicAuthGuard)
  loginOAuth(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    return this.authService.loginOAuth({ req, res });
  }
}
