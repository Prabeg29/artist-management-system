import { Knex } from 'knex';

import { asyncLocalStorage } from '@middlewares/connectionResolver';

export class BaseRepository {
  get knex(): Knex {
    return asyncLocalStorage.getStore() as Knex;
  }
}