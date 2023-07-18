import { Knex } from 'knex';

import logger from '@utils/logger';
import { roles } from '@enums/roles.enum';
import { dbTables } from '@enums/db-tables.enum';
import { paginate, PaginationInfo } from '../../database';
import { Artist, ArtistInput } from '@modules/artists/artist.type';
import { KnexUserRepository } from '@modules/user/knex-user.repository';

export class KnexArtistRepository extends KnexUserRepository {
  protected selectParams: Array<string> = [
    `${dbTables.USERS}.id`,
    `${dbTables.USERS}.first_name`,
    `${dbTables.USERS}.last_name`,
    `${dbTables.USERS}.email`,
    `${dbTables.USERS}.phone`,
    `${dbTables.USERS}.dob`,
    `${dbTables.USERS}.gender`,
    `${dbTables.USERS}.address`,
    `${dbTables.ARTISTS}.id as artist_id`,
    `${dbTables.ARTISTS}.first_release_year`,
    `${dbTables.ARTISTS}.number_of_albums_released`,
    `${dbTables.ARTISTS}.created_at`,
    `${dbTables.ARTISTS}.updated_at`,
  ];

  constructor(protected readonly knex: Knex) {
    super(knex);
  }

  public async fetchAllPaginated(
    currentPage: number, perPage: number
  ): Promise<{ data: Artist[]; paginationInfo: PaginationInfo; }> {
    const query = this.knex<Artist>(dbTables.USERS)
      .join(dbTables.ARTISTS, `${dbTables.USERS}.id`, '=', `${dbTables.ARTISTS}.user_id`)
      .where(`${dbTables.USERS}.role`, roles.ARTIST);

    return await paginate<Artist>(query, {
      currentPage,
      perPage,
      selectParams: this.selectParams,
    });
  }

  async create(artistData: ArtistInput): Promise<number[]> {
    const trx = await this.knex.transaction();

    try {
      const [userId] = await trx(dbTables.USERS).insert({
        first_name: artistData.first_name,
        last_name : artistData.last_name,
        email     : artistData.email,
        password  : artistData.password,
        phone     : artistData.phone,
        address   : artistData.address,
        gender    : artistData.gender,
        role      : roles.ARTIST,
        dob       : artistData.dob,

      }, ['id']);

      await trx(dbTables.ARTISTS).insert({
        user_id                  : userId,
        first_release_year       : artistData?.first_release_year,
        number_of_albums_released: artistData?.number_of_albums_released
      });

      await trx.commit();

      return [userId];
    } catch (err) {
      logger.error(err);
      await trx.rollback();
    }
  }

  public async fetchOneById(id: number): Promise<Artist | undefined> {
    return await this.knex<Artist>(dbTables.USERS)
      .join(dbTables.ARTISTS, `${dbTables.USERS}.id`, '=', `${dbTables.ARTISTS}.user_id`)
      .where(`${dbTables.USERS}.role`, roles.ARTIST)
      .where(`${dbTables.ARTISTS}.id`, id)
      .select(this.selectParams)
      .first();
  }

  async update(userId: number, artistData: ArtistInput): Promise<boolean> {
    const trx = await this.knex.transaction();

    try {
      await trx(dbTables.USERS)
        .where('id', userId)
        .update({
          first_name: artistData.first_name,
          last_name : artistData.last_name,
          email     : artistData.email,
          password  : artistData.password,
          phone     : artistData.phone,
          address   : artistData.address,
          gender    : artistData.gender,
          dob       : artistData.dob,
        });

      await trx(dbTables.ARTISTS)
        .where('user_id', userId)
        .update({
          first_release_year       : artistData.first_release_year,
          number_of_albums_released: artistData.number_of_albums_released
        });

      await trx.commit();

      return true;
    } catch (err) {
      logger.error(err);
      await trx.rollback();
    }
  }
}
