import { Song } from '../song.type';
import { songStub } from './song.stub';
import knexInstance from '../../../database';
import { SongService } from '../song.service';
import { HttpException } from '@exceptions/http.exception';
import { KnexSongRepository } from '../knex-song.repository';

describe('SongService', () => {
  const knexSongRepository: KnexSongRepository = new KnexSongRepository(knexInstance);
  const songService: SongService = new SongService(knexSongRepository);

  let mockFetchOneById: jest.SpyInstance<Promise<Song | undefined>, [id: number]>;


  beforeEach(() => jest.clearAllMocks());

  describe('fetchOneById', () => {
    let song: Song;
    let error: HttpException;
  
    it('should throw error when artist doesn\'t exist', async () => {
      mockFetchOneById = jest
        .spyOn(knexSongRepository, 'fetchOneById')
        .mockImplementation(() => Promise.resolve(undefined));

      try {
        song = await songService.fetchOneById(23);
      } catch (err) {
        error = err as { message: 'Song with given id does not exists', statusCode: 404, name: 'HttpException' };
      }

      expect(mockFetchOneById).toHaveBeenCalledWith(23);
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Song with given id does not exists');
      expect(error.statusCode).toBe(404);
    });


    it('should return song with the id', async () => {
      mockFetchOneById = jest
        .spyOn(knexSongRepository, 'fetchOneById')
        .mockImplementation(() => Promise.resolve(songStub()[0]));

      song = await songService.fetchOneById(1);

      expect(mockFetchOneById).toHaveBeenCalledWith(1);
      expect(song).toMatchObject(songStub()[0]);
    });
  });
});
