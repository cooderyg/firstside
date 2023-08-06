import { EntityManager } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface IUsersServiceFindOneByEamil {
  email: string;
}

export interface IUsersServiceFindById {
  id: string;
}

export interface IUsersServiceCreate {
  createUserDto: CreateUserDto;
}

export interface IUpdatePointWithManager {
  manager: EntityManager;
  pointAmount: number;
  user: User;
}
