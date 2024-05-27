import bcrypt from 'bcrypt';
import { Knex } from 'knex';

import { roles } from '../../enums/roles.enum';
import { gender } from '../../enums/gender.enum';
import { dbTables } from '../../enums/db-tables.enum';
import { UserInput } from '../../modules/user/user.type';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(dbTables.USERS).del();

  const superAdmin: UserInput = { 
    first_name: 'Prabeg', 
    last_name : 'shakya', 
    email     : 'shakyaprabeg@gmail.com',
    password  : await bcrypt.hash('P@ssword#123', 10),
    phone     : '9841780470',
    dob       : new Date('1997-06-11'),
    gender    : gender.MALE,
    address   : 'Dallu, Kathmandu',
    role      : roles.SUPER_ADMIN
  };

  // Inserts seed entries
  await knex(dbTables.USERS).insert(superAdmin);
}
