import { Knex } from 'knex';

import { dbTables } from '@enums/db-tables.enum';
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
}
