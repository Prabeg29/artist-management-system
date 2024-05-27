import { SongService } from '../song.service';
import { Song, SongInput } from '../song.type';
import { songInputStub, songStub } from './song.stub';
import { PaginationInfo } from '../../../utils/db.util';
import { KnexSongRepository } from '../knex-song.repository';
import { HttpException } from '../../../exceptions/http.exception';

describe('SongService', () => {
  const knexSongRepository: KnexSongRepository = new KnexSongRepository();
  const songService: SongService = new SongService(knexSongRepository);

  let mockFetchAllPaginated: jest.SpyInstance<
    Promise<{ data: Song[]; paginationInfo: PaginationInfo; }>, 
    [artistId: number, currentPage: number, perPage: number]
  >;
  let mockFetchOneById: jest.SpyInstance<Promise<Song | undefined>, [id: number]>;
  let mockFetchOneByTitle: jest.SpyInstance<Promise<Song | undefined>, [artistId: number, songTitke: string]>;
  let mockCreate: jest.SpyInstance<Promise<number[]>, [artistId: number, songData: SongInput]>;
  let mockUpdate: jest.SpyInstance<Promise<boolean>, [id: number, songData: SongInput]>;
  let mockDelete: jest.SpyInstance<Promise<number>, [id: number]>;

  let song: Song;
  let error: HttpException;

  beforeEach(() => jest.clearAllMocks());

  describe('fetchAllPaginated', () => {
    it('should return array of songs with paginated info', async () => {
      const paginationInfo = {
        total      : 1,
        perPage    : 1,
        currentPage: 1,
        lastPage   : 1,
        prevPage   : null,
        nextPage   : null,
      } as PaginationInfo;

      mockFetchAllPaginated = jest
        .spyOn(knexSongRepository, 'fetchAllPaginated')
        .mockImplementation(() => Promise.resolve({ data: songStub(), paginationInfo }));

      const res = await songService.fetchAllPaginated(1, '1', '1');

      expect(mockFetchAllPaginated).toHaveBeenCalledWith(1, 1, 1);
      expect(res).toMatchObject({ data: songStub(), paginationInfo });
    });
  });

  describe('fetchOneById', () => {  
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

  describe('create', () => {
    it('should throw error when trying to create a song already exists for the artist', async () => {
      mockFetchOneByTitle = jest
        .spyOn(knexSongRepository, 'fetchOneByTitle')
        .mockImplementation(() => Promise.resolve(songStub()[0]));

      try {
        song = await songService.create(1, songInputStub());
      } catch (err) {
        error = err as { message: 'Song already exists for the artist', statusCode: 404, name: 'HttpException' };
      }

      expect(mockFetchOneByTitle).toHaveBeenCalledWith(1, songInputStub().title);
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Song already exists for the artist');
      expect(error.statusCode).toBe(404);
    });

    it('should create a new song for the artist', async () => {
      mockFetchOneByTitle = jest
        .spyOn(knexSongRepository, 'fetchOneByTitle')
        .mockImplementation(() => Promise.resolve(undefined));

      mockCreate = jest
        .spyOn(knexSongRepository, 'create')
        .mockImplementation(() => Promise.resolve([songStub()[0].id]));

      song = await songService.create(1, songInputStub());

      expect(mockFetchOneByTitle).toHaveBeenCalledWith(1, songInputStub().title);
      expect(mockCreate).toHaveBeenCalledWith(1, songInputStub());
      expect(song).toMatchObject(songStub()[0]);
    });
  });

  describe('update', () => {
    // it('should throw error when trying to update a song title that already exists for the artist', async () => {
    //   mockFetchOneByTitle = jest
    //     .spyOn(knexSongRepository, 'fetchOneByTitle')
    //     .mockImplementation(() => Promise.resolve(songStub()[0]));
      
    //   mockFetchOneById = jest
    //     .spyOn(knexSongRepository, 'fetchOneById')
    //     .mockImplementation(() => Promise.resolve(songStub()[0]));

    //   mockUpdate = jest.spyOn(knexSongRepository, 'update').mockImplementation(() => Promise.resolve(false));

    //   try {
    //     song = await songService.update(1, 1, songInputStub());
    //   } catch (err) {
    //     error = err as HttpException;
    //   }

    //   expect(mockFetchOneByTitle).toHaveBeenCalledWith(1, songInputStub().title);
    //   expect(error).toBeInstanceOf(HttpException);
    //   expect(error.message).toBe('Song with title already exists for the artist');
    //   expect(error.statusCode).toBe(404);
    //   expect(mockUpdate).not.toHaveBeenCalledWith(1, songInputStub());
    // });

    it('should update the song', async () => {
      mockFetchOneByTitle = jest
        .spyOn(knexSongRepository, 'fetchOneByTitle')
        .mockImplementation(() => Promise.resolve(undefined));
      
      mockFetchOneById = jest
        .spyOn(knexSongRepository, 'fetchOneById')
        .mockImplementation(() => Promise.resolve(songStub()[0]));

      mockUpdate = jest.spyOn(knexSongRepository, 'update').mockImplementation(() => Promise.resolve(true));

      song = await songService.update(1, 1, songInputStub());

      expect(mockFetchOneByTitle).toHaveBeenCalledWith(1, songInputStub().title);
      expect(mockFetchOneById).toHaveBeenCalledWith(1);
      expect(mockUpdate).toHaveBeenCalledWith(1, songInputStub());
      expect(song).toMatchObject(songStub()[0]);
    });
  });

  describe('delete', () => {  
    it('should delete the song', async () => {
      mockFetchOneById = jest
        .spyOn(knexSongRepository, 'fetchOneById')
        .mockImplementation(() => Promise.resolve(songStub()[0]));
      
      mockDelete = jest
        .spyOn(knexSongRepository, 'delete')
        .mockImplementation(() => Promise.resolve(1));

      await songService.delete(1);

      expect(mockFetchOneById).toHaveBeenCalledWith(1);
      expect(mockDelete).toHaveBeenCalledWith(1);
    });
  });
});
