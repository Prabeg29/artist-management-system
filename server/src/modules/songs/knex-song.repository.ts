import { Song, SongInput } from './song.type';
import { BaseRepository } from '../base.repository';
import { dbTables } from '../../enums/db-tables.enum';
import { paginate, PaginationInfo } from '../../utils/db.util';

export class KnexSongRepository extends BaseRepository {
  async create(artistId: number, songData: SongInput): Promise<number[]> {
    return await this.knex(dbTables.SONGS).insert({ ...songData, artist_id: artistId}, ['id']);
  }

  async fetchOneById(songId: number): Promise<Song | undefined> {
    return await this.knex(dbTables.SONGS).where('id', songId).first();
  }

  async fetchOneByTitle(artistId: number, songTitle: string): Promise<Song | undefined> {
    return await this.knex(dbTables.SONGS)
      .where('artist_id', artistId)
      .where('title', songTitle)
      .first();
  }

  public async fetchAllPaginated(
    artistId: number, currentPage: number, perPage: number
  ): Promise<{ data: Song[]; paginationInfo: PaginationInfo; }> {
    return await paginate<Song>(
      this.knex<Song>(dbTables.SONGS).where('artist_id', artistId), 
      { currentPage, perPage }
    );
  }

  async update(id: number, songData: SongInput): Promise<boolean> {
    return await this.knex(dbTables.SONGS).where('id', id).update({ ...songData });
  }

  async delete(id: number): Promise<number> {
    return await this.knex(dbTables.SONGS).where('id', id).del();
  }
}
