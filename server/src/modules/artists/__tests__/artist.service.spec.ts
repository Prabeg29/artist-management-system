import { User } from '@modules/user/user.type';
import { ArtistService } from '../artist.service';
import { Artist, ArtistInput } from '../artist.type';
import { HttpException } from '@exceptions/http.exception';
import { artistStub, artistInputStub } from './artist.stub';
import { userStub } from '@modules/user/__tests__/user.stub';
import { KnexArtistRepository } from '../knex-artist.repository';
import knexInstance, { PaginationInfo } from '../../../database';

describe('ArtistService', () => {
  const knexArtistRepository: KnexArtistRepository = new KnexArtistRepository(knexInstance);
  const artistService: ArtistService = new ArtistService(knexArtistRepository);

  let mockFetchAllPaginated: jest.SpyInstance<
    Promise<{ data: Artist[]; paginationInfo: PaginationInfo; }>, 
    [currentPage: number, perPage: number]
  >;
  let mockFetchOneById: jest.SpyInstance<Promise<Artist | undefined>, [id: number]>;
  let mockFetchOneByEmail: jest.SpyInstance<Promise<User | undefined>, [email: string]>;
  let mockCreate: jest.SpyInstance<Promise<number[]>, [artistData: ArtistInput]>;
  let mockUpdate: jest.SpyInstance<Promise<boolean>, [id: number, artistData: ArtistInput]>;
  let mockDelete: jest.SpyInstance<Promise<number>, [id: number]>;
  let res: Artist;
  let error: HttpException;

  beforeEach(() => jest.clearAllMocks());

  describe('fetchAllPaginated', () => {
    it('should return array of artist with paginated info', async () => {
      const paginationInfo = {
        total      : 1,
        perPage    : 1,
        currentPage: 1,
        lastPage   : 1,
        prevPage   : null,
        nextPage   : null,
      } as PaginationInfo;

      mockFetchAllPaginated = jest
        .spyOn(knexArtistRepository, 'fetchAllPaginated')
        .mockImplementation(() => Promise.resolve({ data: artistStub(), paginationInfo }));

      const res = await artistService.fetchAllPaginated('1', '1');

      expect(mockFetchAllPaginated).toHaveBeenCalledWith(1, 1);
      expect(res).toMatchObject({ data: artistStub(), paginationInfo });
    });
  });

  describe('fetchOneById', () => {
    it('should throw error when artist doesn\'t exist', async () => {
      mockFetchOneById = jest
        .spyOn(knexArtistRepository, 'fetchOneById')
        .mockImplementation(() => Promise.resolve(undefined));

      try {
        res = await artistService.fetchOneById(23);
      } catch (err) {
        error = err as { message: 'User with the provided email already exists', statusCode: 400, name: 'HttpException' };
      }

      expect(mockFetchOneById).toHaveBeenCalledWith(23);
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Artist with the given id does not exists');
      expect(error.statusCode).toBe(404);
    });

    it('should return the existing artist', async () => {
      mockFetchOneById = jest
        .spyOn(knexArtistRepository, 'fetchOneById')
        .mockImplementation(() => Promise.resolve(artistStub()[0]));

      res = await artistService.fetchOneById(1);

      expect(res).toMatchObject(artistStub()[0]);
    });
  });

  describe('create', () => {
    it('should throw error when artist exist with same email', async () => {
      mockFetchOneByEmail = jest
        .spyOn(knexArtistRepository, 'fetchOneByEmail')
        .mockImplementation(() => Promise.resolve(userStub()[0]));

      try {
        res = await artistService.create(artistInputStub());
      } catch (err) {
        error = err as { message: 'User with the provided email already exists', statusCode: 400, name: 'HttpException' };
      }

      expect(mockFetchOneByEmail).toHaveBeenCalledWith(artistInputStub().email);
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('User with the provided email already exists');
      expect(error.statusCode).toBe(400);
    });

    it('should return the new artist', async () => {
      mockFetchOneByEmail = jest
        .spyOn(knexArtistRepository, 'fetchOneByEmail')
        .mockImplementation(() => Promise.resolve(undefined));

      mockCreate = jest
        .spyOn(knexArtistRepository, 'create')
        .mockImplementation(() => Promise.resolve([artistStub()[0].id]));

      mockFetchOneById = jest
        .spyOn(knexArtistRepository, 'fetchOneById')
        .mockImplementation(() => Promise.resolve(artistStub()[0]));
    
      res = await artistService.create(artistInputStub());

      expect(mockFetchOneByEmail).toHaveBeenCalledWith(artistInputStub().email);
      expect(mockCreate).toHaveBeenCalled();
      expect(mockFetchOneById).toHaveBeenCalledWith(artistStub()[0].id);

      expect(res).toMatchObject(artistStub()[0]);
    });
  });

  describe('update', () => {
    it('should throw exception when another user has same email', async () => {
      mockFetchOneById = jest
        .spyOn(knexArtistRepository, 'fetchOneById')
        .mockImplementation(() => Promise.resolve(artistStub()[0]));
    
      mockFetchOneByEmail = jest
        .spyOn(knexArtistRepository, 'fetchOneByEmail')
        .mockImplementation(() => Promise.resolve({ ...artistStub()[0], id: 3 }));
    
      try {
        await artistService.update(artistStub()[0].id, artistInputStub());

      } catch (err) {
        error = err as {
                message: 'User with the provided email already exists',
                statusCode: 400,
                name: 'HttpException'
            };
      }

      expect(mockFetchOneById).toHaveBeenCalledWith(artistStub()[0].id);
      expect(mockFetchOneByEmail).toHaveBeenCalledWith(artistStub()[0].email);
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('User with the provided email already exists');
      expect(error.statusCode).toBe(400);
    });

    it('should update the artist', async () => {
      mockFetchOneById = jest
        .spyOn(knexArtistRepository, 'fetchOneById')
        .mockImplementation(() => Promise.resolve(artistStub()[0]));
      
      mockFetchOneByEmail = jest
        .spyOn(knexArtistRepository, 'fetchOneByEmail')
        .mockImplementation(() => Promise.resolve(artistStub()[0]));
    
      mockUpdate = jest
        .spyOn(knexArtistRepository, 'update')
        .mockImplementation(() => Promise.resolve(true));
      
      await artistService.update(artistStub()[0].id, artistInputStub());

      expect(mockFetchOneById).toHaveBeenCalledWith(artistStub()[0].id);
      expect(mockFetchOneByEmail).toHaveBeenCalledWith(artistStub()[0].email);
      expect(mockUpdate).toHaveBeenCalledWith(artistStub()[0].id, artistInputStub());
      expect(mockFetchOneById).toHaveBeenCalledTimes(2);
    });
  });

  describe('delete', () => {
    it('should delete the artist with the corresponding id', async () => {
      mockFetchOneById = jest
        .spyOn(knexArtistRepository, 'fetchOneById')
        .mockImplementation(() => Promise.resolve(artistStub()[0]));

      mockDelete = jest
        .spyOn(knexArtistRepository, 'delete')
        .mockImplementation(() => Promise.resolve(1));
    
      await artistService.delete(artistStub()[0].id);

      expect(mockFetchOneById).toHaveBeenCalledWith(artistStub()[0].id);
      expect(mockDelete).toHaveBeenCalledWith(artistStub()[0].id);
    });
  });
});
