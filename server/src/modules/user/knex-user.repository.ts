import { dbTables } from '@enums/db-tables.enum';
import { BaseRepository } from '@utils/base.repository';
import { paginate, PaginationInfo } from '../../database';
import { User, UserInput } from '@modules/user/user.type';
import { UserRepositoryInterface } from './user.irepository';

export class KnexUserRepository extends BaseRepository implements UserRepositoryInterface{
  public async fetchOneByEmail(email: string): Promise<User | undefined> {
    return await this.knex<User>(dbTables.USERS).where('email', email).first();
  }

  public async create(userData: UserInput): Promise<number[]> {
    return await this.knex(dbTables.USERS).insert({ ...userData }, ['id']);
  }

  public async fetchOneById(id: number): Promise<User | undefined> {
    return await this.knex<User>(dbTables.USERS).where('id', id).first();
  }

  public async fetchAllPaginated(
    currentPage: number, perPage: number
  ): Promise<{ data: User[]; paginationInfo: PaginationInfo; }> {
    return await paginate<User>(this.knex<User>(dbTables.USERS), { currentPage, perPage });
  }

  public async update(id: number, userData: UserInput): Promise<boolean> {
    return await this.knex(dbTables.USERS).where('id', id).update({ ...userData });
  }

  public async delete(id: number): Promise<number> {
    return await this.knex(dbTables.USERS).where('id', id).del();
  }
}
