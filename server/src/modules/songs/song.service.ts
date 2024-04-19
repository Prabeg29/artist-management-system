import { StatusCodes } from 'http-status-codes';

import { Song, SongInput } from './song.type';
import { PaginationInfo } from '../../database';
import { pagination } from '@enums/pagination.enum';
import { KnexSongRepository } from './knex-song.repository';
import { HttpException } from '@exceptions/http.exception';

export class SongService {
  constructor(protected readonly songRepository: KnexSongRepository) {}

  public async fetchOneById(songId: number): Promise<Song> {
    const song = await this.songRepository.fetchOneById(songId);

    if (!song) {
      throw new HttpException('Song with given id does not exists', StatusCodes.NOT_FOUND);
    }

    return song;
  }

  public async create(artistId: number, songData: SongInput): Promise<Song> {
    const song = await this.songRepository.fetchOneByTitle(artistId, songData.title);

    if (song) {
      throw new HttpException('Song already exists for the artist', StatusCodes.NOT_FOUND);
    }

    const [songId]= await this.songRepository.create(artistId, songData);

    return await this.fetchOneById(songId);
  }

  public async fetchAllPaginated(
    artistId: number,
    currentPage: string, 
    perPage: string
  ): Promise<{ data: Song[]; paginationInfo: PaginationInfo; }> {
    const currentPageNumber = Number(currentPage)|| pagination.DEFAULT_PAGE;
    const perPageNumber = Number(perPage) || pagination.DEFAULT_RECORDS_PER_PAGE;

    return await this.songRepository.fetchAllPaginated(artistId, currentPageNumber, perPageNumber);
  }

  public async update(artistId: number, songId: number, songData: SongInput): Promise<Song> {
    const existingSong = await this.songRepository.fetchOneByTitle(artistId, songData.title);
    const song = await this.songRepository.fetchOneById(songId);

    if (
      existingSong &&
      (existingSong.id !== song.id)
    ) {
      throw new HttpException('Song with title already exists for the artist', StatusCodes.NOT_FOUND);
    }

    await this.songRepository.update(song.id, songData);
    
    return await this.fetchOneById(song.id);
  }

  public async delete(id: number): Promise<void> {
    const song: Song =  await this.fetchOneById(id);

    const result = await this.songRepository.delete(song.id);

    if (!result) {
      throw new Error('Error while deleting song');
    }
  }
}
