import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import { UserInput, User } from '@modules/user/user.type';
import { HttpException } from '@exceptions/http.exception';
import { UserRepositoryInterface } from '@modules/user/user.irepository';

export class AuthService {
  constructor(protected readonly userRepository: UserRepositoryInterface) {}

  public async signup(userData: UserInput): Promise<User> {
    const isExistingUser = await this.userRepository.fetchOneByEmail(userData.email);

    if (isExistingUser) {
      throw new HttpException(
        'User with the provided email already exists',
        StatusCodes.BAD_REQUEST
      );
    }

    userData.password = await bcrypt.hash(userData.password, 10);

    await this.userRepository.create(userData);

    return await this.userRepository.fetchOneByEmail(userData.email);
  }
}
