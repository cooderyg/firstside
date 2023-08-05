import { Response } from 'express';
import { User } from 'src/apis/users/entities/user.entity';
import { IAuthUser, IContext } from 'src/commons/interfaces/context';

export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}
export interface IAuthServiceRestoreAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceLogin {
  email: string;
  password: string;
  context: IContext;
}
