import { Knex } from 'knex';

import { dbTables } from '../../enums/db-tables.enum';

export async function up(knex: Knex): Promise<void> {
  const sql = `CREATE TABLE artists (
    id                     INT       UNSIGNED NOT NULL AUTO_INCREMENT,
    firstReleaseYear       YEAR,
    numberOfAlbumsReleased TINYINT,
    userId                 INT       UNSIGNED NOT NULL,
    createdAt              DATETIME  DEFAULT CURRENT_TIMESTAMP,
    updatedAt              DATETIME  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt              DATETIME,
    
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
  );`;

  await knex.raw(sql);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table(dbTables.ARTISTS, function (table) {
    table.dropForeign(['userId', 'artists_ibfk_1']);
  });
  await knex.schema.dropTable(dbTables.ARTISTS);
}
