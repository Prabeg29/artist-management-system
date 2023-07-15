import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { UserInput } from './user.type';
import { UserMapper } from './user.mapper';
import { UserService } from './user.service';
import { AuthService } from '@modules/auth/auth.service';

export class UserController {
  constructor(
    protected readonly userService: UserService,
    protected readonly authService: AuthService
  ) {}

  public index = async (
    req: Request<unknown, unknown, unknown, { currentPage?: string; perPage?: string;}>,
    res: Response
  ): Promise<void> => { 
    const { data: users, paginationInfo } = await this.userService.fetchAllPaginated(
      req.query.currentPage, 
      req.query.perPage
    );

    res.status(StatusCodes.OK).json({
      message: 'Users fetched successfully',
      users  : UserMapper.toDtoCollection(users),
      meta   : {
        paginationInfo: paginationInfo
      },
    });
  };

  public store = async (req: Request, res: Response): Promise<void> => { 
    const user = await this.authService.signup(req.body as UserInput);

    res.status(StatusCodes.CREATED).json({
      message: 'User created successfully.',
      data   : UserMapper.toDto(user)
    });
  };

  public show = async (req: Request, res: Response): Promise<void> => { 
    const user = await this.userService.fetchOneById(parseInt(req.params.id));

    res.status(StatusCodes.CREATED).json({
      message: 'User fetched successfully.',
      data   : UserMapper.toDto(user)
    });
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    const user = await this.userService.update(parseInt(req.params.id), req.body as UserInput);

    res.status(StatusCodes.CREATED).json({
      message: 'User updated successfully.',
      data   : UserMapper.toDto(user)
    });
  };

  public destroy = async (req: Request, res: Response): Promise<void> => {
    await this.userService.delete(parseInt(req.params.id));

    res.status(StatusCodes.CREATED).json({
      message: 'User deleted successfully.',
    });
  };
}
