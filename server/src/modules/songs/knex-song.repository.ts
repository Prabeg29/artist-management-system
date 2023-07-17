import { Knex } from 'knex';

import { Song, SongInput } from './song.type';
import { dbTables } from '@enums/db-tables.enum';
import { paginate, PaginationInfo } from '../../database';

export class KnexSongRepository {
  constructor(protected readonly knex: Knex) { }

  async create(artistId: number, songData: SongInput): Promise<number[]> {
    return await this.knex(dbTables.SONGS).insert({ ...songData, artist_id: artistId}, ['id']);
  }

  async fetchOneById(songId: number): Promise<Song | undefined> {
    return await this.knex(dbTables.SONGS).where('id', songId).first();
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
