import { Knex } from 'knex';

import logger from '@utils/logger';
import { dbTables } from '@enums/db-tables.enum';
import { paginate, PaginationInfo } from '../../database';
import { User, UserInput } from '@modules/user/user.type';
import { UserRepositoryInterface } from './user.irepository';

export class KnexUserRepository implements UserRepositoryInterface {
  constructor(protected readonly knex: Knex) { }

  public async fetchOneByEmail(email: string): Promise<User | undefined> {
    return await this.knex<User>(dbTables.USERS).where('email', email).first();
  }

  async create(userData: UserInput): Promise<number[]> {
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

  async update(id: number, userData: UserInput): Promise<boolean> {
    return await this.knex(dbTables.USERS).where('id', id).update({ ...userData });
  }

  async delete(id: number): Promise<number> {
    const trx = await this.knex.transaction();

    try {
      await this.knex(dbTables.ARTISTS).where('user_id', id).del();

      await this.knex(dbTables.USERS).where('id', id).del();

      await trx.commit();

      return 1;
    } catch (err) {
      logger.error(err);
      await trx.rollback();
    }
  }
}
