import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserService } from '../user.service';
import { User, UserInput } from '../user.type';
import { userInputStub, userStub } from './user.stub';
import { HttpException } from '@exceptions/http.exception';
import { KnexUserRepository } from '../knex-user.repository';
import  { PaginationInfo } from '../../../database';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('UserService', () => {
  const knexUserRepository: KnexUserRepository = new KnexUserRepository();
  const userService: UserService = new UserService(knexUserRepository);

  let mockFetchOneByEmail: jest.SpyInstance<Promise<User | undefined>, [email: string]>;
  let mockCreate: jest.SpyInstance<Promise<number[]>, [userData: UserInput]>;
  let mockFetchOneById: jest.SpyInstance<Promise<User | undefined>, [id: number]>;
  let mockUpdate: jest.SpyInstance<Promise<boolean>, [id: number, artistData: UserInput]>;
  let mockDelete: jest.SpyInstance<Promise<number>, [id: number]>;
  let mockFetchAllPaginated: jest.SpyInstance<
    Promise<{ data: User[]; paginationInfo: PaginationInfo; }>, 
    [currentPage: number, perPage: number]
  >;

  let res;
  let error: HttpException;

  beforeEach(() => {
    mockFetchOneByEmail = jest.spyOn(knexUserRepository, 'fetchOneByEmail');
    mockCreate = jest.spyOn(knexUserRepository, 'create');
    mockFetchOneById = jest.spyOn(knexUserRepository, 'fetchOneById');
    mockUpdate = jest.spyOn(knexUserRepository, 'update');
    mockDelete = jest.spyOn(knexUserRepository, 'delete');
    mockFetchAllPaginated = jest.spyOn(knexUserRepository, 'fetchAllPaginated');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should throw HttpException when user email is not unique', async () => {
      mockFetchOneByEmail.mockResolvedValue(userStub()[0]);

      try {
        res = await userService.create(userInputStub());
      } catch (err) {
        error = err as HttpException;
      }

      expect(mockFetchOneByEmail).toHaveBeenCalledWith(userInputStub().email);
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('User with the provided email already exists');
      expect(error.statusCode).toBe(400);
    });

    it('should create a user with unique email', async () => {
      mockFetchOneByEmail.mockResolvedValue(undefined);
      mockCreate.mockResolvedValue([userStub()[0].id]);
      mockFetchOneById.mockResolvedValue(userStub()[0]);

      res = await userService.create(userInputStub());

      expect(mockFetchOneByEmail).toHaveBeenCalledWith(userInputStub().email);
      expect(bcrypt.hash).toHaveBeenCalledWith(userInputStub().password, 10);
      expect(mockCreate).toHaveBeenCalledWith({ ...userInputStub(), password: undefined });
      expect(res).toMatchObject(userStub()[0]);
    });
  });

  describe('signin', () => {
    it('should throw HttpException when user does not exist', async () => {
      mockFetchOneByEmail.mockResolvedValue(undefined);

      try {
        res = await userService.signin(userInputStub());
      } catch (err) {
        error = err as HttpException;
      }

      expect(mockFetchOneByEmail).toHaveBeenCalledWith(userInputStub().email);
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Invalid credentials');
      expect(error.statusCode).toBe(401);
    });

    it('should throw HttpException when password is invalid', async () => {
      mockFetchOneByEmail.mockResolvedValue(userStub()[0]);
      bcrypt.compare = jest.fn(() => Promise.resolve(false));

      try {
        res = await userService.signin(userInputStub());
      } catch (err) {
        error = err as HttpException;
      }

      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Invalid credentials');
      expect(error.statusCode).toBe(401);
    });

    it('should return user with access token when credentials are valid', async () => {
      mockFetchOneByEmail.mockResolvedValue(userStub()[0]);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue('dummy-jwt-token');

      res = await userService.signin(userInputStub());

      expect(res).toMatchObject({ ...userStub()[0], token: 'dummy-jwt-token' });
    });
  });

  describe('fetchAllPaginated', () => {
    it('should return array of users with paginated info', async () => {
      const paginationInfo = {
        total      : 1,
        perPage    : 1,
        currentPage: 1,
        lastPage   : 1,
        prevPage   : null,
        nextPage   : null,
      } as PaginationInfo;

      mockFetchAllPaginated.mockResolvedValue({ data: userStub(), paginationInfo });

      const res = await userService.fetchAllPaginated('1', '1');

      expect(mockFetchAllPaginated).toHaveBeenCalledWith(1, 1);
      expect(res).toMatchObject({ data: userStub(), paginationInfo });
    });
  });

  describe('fetchOneById', () => {
    it('should throw error when user doesn\'t exist', async () => {
      mockFetchOneById.mockResolvedValue(undefined);

      try {
        res = await userService.fetchOneById(23);
      } catch (err) {
        error = err as HttpException;
      }

      expect(mockFetchOneById).toHaveBeenCalledWith(23);
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('User with the given id does not exists');
      expect(error.statusCode).toBe(404);
    });

    it('should return the existing user', async () => {
      mockFetchOneById.mockResolvedValue(userStub()[0]);

      res = await userService.fetchOneById(userStub()[0].id);

      expect(res).toMatchObject(userStub()[0]);
    });
  });

  describe('update', () => {
    it('should throw exception when another user has same email', async () => {
      mockFetchOneById.mockResolvedValue(userStub()[0]);
      mockFetchOneByEmail.mockResolvedValue({ ...userStub()[0], id: 3 });
    
      try {
        await userService.update(userStub()[0].id, userInputStub());
      } catch (err) {
        error = err as {
                message: 'User with the provided email already exists',
                statusCode: 400,
                name: 'HttpException'
            };
      }

      expect(mockFetchOneById).toHaveBeenCalledWith(userStub()[0].id);
      expect(mockFetchOneByEmail).toHaveBeenCalledWith(userStub()[0].email);
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('User with the provided email already exists');
      expect(error.statusCode).toBe(400);
    });

    it('should update the user', async () => {
      mockFetchOneById.mockResolvedValue(userStub()[0]);
      mockFetchOneByEmail.mockResolvedValue(userStub()[0]);

      mockUpdate.mockResolvedValue(true);
      
      await userService.update(userStub()[0].id, userInputStub());

      expect(mockUpdate).toHaveBeenCalledWith(userStub()[0].id, userInputStub());
      expect(mockFetchOneById).toHaveBeenCalledTimes(2);
    });
  });

  describe('delete', () => {
    it('should delete the user with the corresponding id', async () => {
      mockFetchOneById.mockResolvedValue(userStub()[0]);
      mockDelete.mockResolvedValue(1);
    
      await userService.delete(userStub()[0].id);

      expect(mockFetchOneById).toHaveBeenCalledWith(userStub()[0].id);
      expect(mockDelete).toHaveBeenCalledWith(userStub()[0].id);
    });
  });
});