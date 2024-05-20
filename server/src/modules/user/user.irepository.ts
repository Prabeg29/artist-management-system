import { User, UserInput } from './user.type';
import { PaginationInfo } from '../../utils/db.util';

export interface UserRepositoryInterface{
  fetchOneByEmail(email: string): Promise<User | undefined>;
  create(userData: UserInput): Promise<number[]>;
  fetchOneById(id: number): Promise<User | undefined>;
  fetchAllPaginated(currentPage: number, perPage: number): Promise<{ data: User[]; paginationInfo: PaginationInfo; }>;
  update(id: number, userData: UserInput): Promise<boolean>;
  delete(id: number): Promise<number>;
}