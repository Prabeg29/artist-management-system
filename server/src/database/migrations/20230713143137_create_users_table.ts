import { Knex } from 'knex';

import { dbTables } from '@enums/db-tables.enum';
import { roles } from '@enums/roles.enum';
import { gender } from '@enums/gender.enum';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(dbTables.USERS, function (table) {
    table.increments();

    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password', 500).notNullable();
    table.string('phone', 20).notNullable();
    table.dateTime('dob').notNullable();
    table.enu('gender', [gender.MALE, gender.FEMALE, gender.OTHER]).notNullable();
    table.string('address').notNullable();
    table.enu('role', [roles.SUPER_ADMIN, roles.ARTIST_MANAGER, roles.ARTIST]).notNullable();

    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(dbTables.USERS);
}
