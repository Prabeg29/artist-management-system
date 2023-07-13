import { Knex } from 'knex';

import { dbTables } from '@enums/db-tables.enum';
import { roles } from '@enums/roles.enum';
import { gender } from '@enums/gender.enum';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(dbTables.USERS, function (table) {
    table.increments();

    table.string('first_name');
    table.string('last_name');
    table.string('email').unique();
    table.string('password', 500);
    table.string('phone', 20);
    table.dateTime('dob');
    table.enu('gender', [gender.MALE, gender.FEMALE, gender.OTHER]);
    table.string('address');
    table.enu('role', [roles.SUPER_ADMIN, roles.ARTIST_MANAGER, roles.ARTIST]);

    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(dbTables.USERS);
}
