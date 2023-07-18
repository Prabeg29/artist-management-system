import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import config from '@config';
import { PaginationInfo } from '../../database';
import { pagination } from '@enums/pagination.enum';
import { User, UserInput } from '@modules/user/user.type';
import { HttpException } from '@exceptions/http.exception';
import { UserRepositoryInterface } from '@modules/user/user.irepository';

export class UserService {
  constructor(protected readonly userRepository: UserRepositoryInterface) { }

  public async create(userData: UserInput): Promise<User> {
    const isExistingUser = await this.userRepository.fetchOneByEmail(userData.email);

    if (isExistingUser) {
      throw new HttpException('User with the provided email already exists',StatusCodes.BAD_REQUEST);
    }

    userData.password = await bcrypt.hash(userData.password, 10);

    const [userId] = await this.userRepository.create(userData);

    return await this.userRepository.fetchOneById(userId);
  }

  public async signin(userData: UserInput): Promise<User & { token: string; }> {
    const isExistingUser = await this.userRepository.fetchOneByEmail(userData.email);
    const isPasswordValid = await bcrypt.compare(userData.password, isExistingUser.password || '');

    if (!isExistingUser || !isPasswordValid) {
      throw new HttpException('Invalid credentials', StatusCodes.UNAUTHORIZED);
    }

    const authToken = jwt.sign(
      { id: isExistingUser.id, email: isExistingUser.email, role: isExistingUser.role }, 
      config.secrets.jwt, 
      { expiresIn: '15m' }
    );

    return { ...isExistingUser, token: authToken};
  }

  public async fetchAllPaginated(
    currentPage: string, 
    perPage: string
  ): Promise<{ data: User[]; paginationInfo: PaginationInfo; }> {
    const currentPageNumber = Number(currentPage)|| pagination.DEFAULT_PAGE;
    const perPageNumber = Number(perPage) || pagination.DEFAULT_RECORDS_PER_PAGE;

    return await this.userRepository.fetchAllPaginated(currentPageNumber, perPageNumber);
  }

  public async fetchOneById(id: number): Promise<User> {
    const user: User =  await this.userRepository.fetchOneById(id);

    if (!user) {
      throw new HttpException('User with the given id does not exists', StatusCodes.NOT_FOUND);
    }

    return user;
  }

  public async update(id: number, userData: UserInput): Promise<User> {
    const user: User =  await this.fetchOneById(id);

    if (userData.email) {
      const isExistingUser = await this.userRepository.fetchOneByEmail(userData.email);

      if (isExistingUser) {
        throw new HttpException('User with the provided email already exists',StatusCodes.BAD_REQUEST);
      }
    }

    await this.userRepository.update(user.id, userData);
    
    return await this.fetchOneById(user.id);
  }

  public async delete(id: number): Promise<void> {
    const user: User =  await this.fetchOneById(id);

    const result = await this.userRepository.delete(user.id);

    if (!result) {
      throw new Error('Error while deleting user');
    }
  }
}
