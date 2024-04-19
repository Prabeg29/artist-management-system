import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import { PaginationInfo } from '../../database';
import { pagination } from '@enums/pagination.enum';
import { HttpException } from '@exceptions/http.exception';
import { KnexArtistRepository } from './knex-artist.repository';
import { Artist, ArtistInput } from '@modules/artists/artist.type';

export class ArtistService {
  constructor(protected readonly artistRepository: KnexArtistRepository) { }

  public async fetchOneById(id: number): Promise<Artist> {
    const artist: Artist = await this.artistRepository.fetchOneById(id);

    if (!artist) {
      throw new HttpException('Artist with the given id does not exists', StatusCodes.NOT_FOUND);
    }

    return artist;
  }

  public async create(artistData: ArtistInput): Promise<Artist> {
    const isExistingArtist = await this.artistRepository.fetchOneByEmail(artistData.email);

    if (isExistingArtist) {
      throw new HttpException(
        'User with the provided email already exists',
        StatusCodes.BAD_REQUEST
      );
    }

    artistData.password = await bcrypt.hash(artistData.password, 10);

    const [artistId] = await this.artistRepository.create(artistData);

    return await this.fetchOneById(artistId);
  }

  public async fetchAllPaginated(
    currentPage: string,
    perPage: string
  ): Promise<{ data: Artist[]; paginationInfo: PaginationInfo; }> {
    const currentPageNumber = Number(currentPage) || pagination.DEFAULT_PAGE;
    const perPageNumber = Number(perPage) || pagination.DEFAULT_RECORDS_PER_PAGE;

    return await this.artistRepository.fetchAllPaginated(currentPageNumber, perPageNumber);
  }

  public async update(id: number, artistData: ArtistInput): Promise<Artist> {
    const artist: Artist = await this.fetchOneById(id);

    if (artistData.email) {
      const isExistingArtist = await this.artistRepository.fetchOneByEmail(artistData.email);

      if (artist.id !== isExistingArtist.id) {
        throw new HttpException('User with the provided email already exists', StatusCodes.BAD_REQUEST);
      }
    }

    await this.artistRepository.update(artist.id, artistData);

    return await this.fetchOneById(artist.artist_id);
  }

  public async delete(id: number): Promise<void> {
    const artist: Artist = await this.fetchOneById(id);

    const result = await this.artistRepository.delete(artist.id);

    if (!result) {
      throw new Error('Error while deleting artist');
    }
  }
}
