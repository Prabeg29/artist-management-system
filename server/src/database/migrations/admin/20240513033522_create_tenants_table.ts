import { Knex } from 'knex';

import { dbTables } from '@enums/db-tables.enum';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(dbTables.TENANTS, function (table) {
    table.increments();

    table.string('name').notNullable();
    table.string('domain').notNullable();
    table.string('email').notNullable();
    table.string('phone', 30).notNullable();
    table.string('database').notNullable();
    table.dateTime('verifiedAt');

    table.dateTime('createdAt').defaultTo(knex.fn.now());
    table.dateTime('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.dateTime('deletedAt').defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(dbTables.TENANTS);
}

