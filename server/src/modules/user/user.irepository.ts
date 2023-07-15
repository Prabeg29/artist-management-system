import { User, UserInput } from '@modules/user/user.type';

export interface UserRepositoryInterface{
  fetchOneByEmail(email: string): Promise<User | undefined>;
  create(userData: UserInput): Promise<number[]>;
}