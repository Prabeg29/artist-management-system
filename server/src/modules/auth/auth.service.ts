import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import config from '@config';
import { UserInput, User } from '@modules/user/user.type';
import { HttpException } from '@exceptions/http.exception';
import { UserRepositoryInterface } from '@modules/user/user.irepository';

export class AuthService {
  constructor(protected readonly userRepository: UserRepositoryInterface) { }

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

  public async signin(userData: UserInput): Promise<User & { token: string; }> {
    const isExistingUser = await this.userRepository.fetchOneByEmail(userData.email);
    const isPasswordValid = await bcrypt.compare(userData.password, isExistingUser.password || '');

    if (!isExistingUser || !isPasswordValid) {
      throw new HttpException('Invalid credentials', StatusCodes.UNAUTHORIZED);
    }

    const authToken = jwt.sign(
      { email: isExistingUser.email, role: isExistingUser.role }, 
      config.secrets.jwt, 
      { expiresIn: '1h' }
    );

    return { ...isExistingUser, token: authToken};
  }
}
