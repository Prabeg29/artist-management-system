import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AuthService } from './auth.service';
import { UserInput } from '@modules/user/user.type';
import { UserMapper } from '@modules/user/user.mapper';

export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  public signup = async (req: Request, res: Response): Promise<void> => {
    const user = await this.authService.signup(req.body as UserInput);

    res.status(StatusCodes.CREATED).json({
      message: 'User signup successful. Please login to proceed',
      data   : UserMapper.toDto(user)
    });
  };

  public signin = async (req: Request, res: Response): Promise<void> => {
    const user = await this.authService.signin(req.body as UserInput);

    res.status(StatusCodes.OK).json({
      message: 'User signin successful.',
      data   : UserMapper.toDto(user)
    });
  };
}
