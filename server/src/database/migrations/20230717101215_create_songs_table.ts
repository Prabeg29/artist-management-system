import { Knex } from 'knex';

import { genres } from '../../enums/genres.enum';
import { dbTables } from '../../enums/db-tables.enum';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(dbTables.SONGS, function (table) {
    table.increments();

    table.integer('artistId').unsigned().notNullable();
    table.string('title', 255).notNullable();
    table.string('albumName', 255).notNullable();
    table.enu('genre', [genres.RNB, genres.COUNTRY, genres.CLASSIC, genres.ROCK, genres.JAZZ]).notNullable();


    table.dateTime('createdAt').defaultTo(knex.fn.now());
    table.dateTime('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.dateTime('deletedAt').defaultTo(null);

    table.foreign('artistId').references(`${dbTables.ARTISTS}.id`).onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table(dbTables.SONGS, function (table) {
    table.dropForeign(['artistId']);
  });
  await knex.schema.dropTable(dbTables.SONGS);
}
