import { Knex } from 'knex';

import { dbTables } from '../../enums/db-tables.enum';

export async function up(knex: Knex): Promise<void> {
  const sql = `CREATE TABLE artists (
    id                        INT       UNSIGNED NOT NULL AUTO_INCREMENT,
    first_release_year        YEAR,
    number_of_albums_released TINYINT,
    user_id                   INT       UNSIGNED NOT NULL,
    created_at                DATETIME  DEFAULT CURRENT_TIMESTAMP,
    updated_at                DATETIME  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
  );`;

  await knex.raw(sql);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table(dbTables.ARTISTS, function (table) {
    table.dropForeign(['user_id', 'artists_ibfk_1']);
  });
  await knex.schema.dropTable(dbTables.ARTISTS);
}
