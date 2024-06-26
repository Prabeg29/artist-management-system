import logger from '../../utils/logger.util';
import { roles } from '../../enums/roles.enum';
import { Artist, ArtistInput } from './artist.type';
import { dbTables } from '../../enums/db-tables.enum';
import { paginate, PaginationInfo } from '../../utils/db.util';
import { KnexUserRepository } from '../user/knex-user.repository';

export class KnexArtistRepository extends KnexUserRepository {
  protected selectParams: Array<string> = [
    `${dbTables.USERS}.id`,
    `${dbTables.USERS}.fullName`,
    `${dbTables.USERS}.email`,
    `${dbTables.USERS}.phone`,
    `${dbTables.USERS}.dob`,
    `${dbTables.USERS}.gender`,
    `${dbTables.USERS}.role`,
    `${dbTables.USERS}.address`,
    `${dbTables.ARTISTS}.id as artistId`,
    `${dbTables.ARTISTS}.firstReleaseYear`,
    `${dbTables.ARTISTS}.numberOfAlbumsReleased`,
    `${dbTables.ARTISTS}.createdAt`,
    `${dbTables.ARTISTS}.updatedAt`,
  ];

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
        fullName: artistData.fullName,
        email   : artistData.email,
        password: artistData.password,
        phone   : artistData.phone,
        address : artistData.address,
        gender  : artistData.gender,
        role    : roles.ARTIST,
        dob     : artistData.dob,

      }, ['id']);

      const [artistId] = await trx(dbTables.ARTISTS).insert({
        userId                : userId,
        firstReleaseYear      : artistData?.firstReleaseYear,
        numberOfAlbumsReleased: artistData?.numberOfAlbumsReleased
      }, ['id']);

      await trx.commit();

      return [artistId];
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
      if (
        artistData?.fullName || 
        artistData?.email || 
        artistData?.password || 
        artistData?.phone ||
        artistData?.address ||
        artistData?.gender ||
        artistData?.dob
      ) {
        await trx(dbTables.USERS)
          .where('id', userId)
          .update({
            fullname: artistData?.fullName,
            email   : artistData?.email,
            password: artistData?.password,
            phone   : artistData?.phone,
            address : artistData?.address,
            gender  : artistData?.gender,
            dob     : artistData?.dob,
          });
      }

      await trx(dbTables.ARTISTS)
        .where('user_id', userId)
        .update({
          firstReleaseYear      : artistData.firstReleaseYear,
          numberOfAlbumsReleased: artistData.numberOfAlbumsReleased
        });

      await trx.commit();

      return true;
    } catch (err) {
      logger.error(err);
      await trx.rollback();
    }
  }
}
