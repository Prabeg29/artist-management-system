import {  User, UserInput } from '@modules/user/user.type';
import { PaginationInfo } from '../../database';
import { pagination } from '@enums/pagination.enum';
import { UserRepositoryInterface } from '@modules/user/user.irepository';
import { HttpException } from '@exceptions/http.exception';
import { StatusCodes } from 'http-status-codes';

export class UserService {
  constructor(protected readonly userRepository: UserRepositoryInterface) { }

  public async fetchAllPaginated(
    currentPage: string, 
    perPage: string
  ): Promise<{ data: User[]; paginationInfo: PaginationInfo; }> {
    const currentPageNumber = Number(currentPage)|| pagination.DEFAULT_PAGE;
    const perPageNumber = Number(perPage) || pagination.DEFAULT_RECORDS_PER_PAGE;

    return await this.userRepository.fetchAllPaginated(currentPageNumber, perPageNumber);
  }

  public async fetchOneById(id: number): Promise<User> {
    const user: User =  await this.fetchOneById(id);

    if (!user) {
      throw new HttpException('User with the given id does not exists', StatusCodes.NOT_FOUND);
    }

    return await this.userRepository.fetchOneById(id);
  }

  public async update(id: number, userData: UserInput): Promise<User> {
    const user: User =  await this.fetchOneById(id);

    await this.userRepository.update(user.id, userData);
    
    return await this.fetchOneById(user.id);
  }

  public async delete(id: number): Promise<void> {
    const user: User =  await this.fetchOneById(id);

    const result = await this.userRepository.delete(user.id);

    if (!result) {
      throw new Error('Todo not deleted');
    }
  }
}
