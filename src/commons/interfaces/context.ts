import { Request, Response } from 'express';
import { ROLE } from 'src/apis/users/entities/user.entity';

export interface IAuthUser {
  user?: {
    id: string;
    role: ROLE;
  };
}

export interface IContext {
  req: Request & IAuthUser;
  res: Response;
}
