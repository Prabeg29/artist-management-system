import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { UserMapper } from './user.mapper';
import { UserService } from './user.service';
import { User, UserInput } from './user.type';
import { roles } from '../../enums/roles.enum';
import { ArtistInput } from '../artists/artist.type';
import { ArtistService } from '../artists/artist.service';

export class UserController {
  constructor(
    protected readonly userService: UserService,
    protected readonly artistService: ArtistService
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
    const { role }: { role: string; } = req.body;

    const user: User & { token?: string; } = role === roles.ARTIST ? 
      await this.artistService.create(req.body as ArtistInput) :
      await this.userService.create(req.body as UserInput);

    res.status(StatusCodes.CREATED).json({ message: 'User created successfully.', user: UserMapper.toDto(user)});
  };

  public show = async (req: Request, res: Response): Promise<void> => { 
    const user = await this.userService.fetchOneById(parseInt(req.params.id));

    res.status(StatusCodes.OK).json({
      message: 'User fetched successfully.',
      data   : UserMapper.toDto(user)
    });
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    const user = await this.userService.update(parseInt(req.params.id), req.body as UserInput);

    res.status(StatusCodes.OK).json({
      message: 'User updated successfully.',
      data   : UserMapper.toDto(user)
    });
  };

  public destroy = async (req: Request, res: Response): Promise<void> => {
    await this.userService.delete(parseInt(req.params.id));

    res.status(StatusCodes.OK).json({ message: 'User deleted successfully.' });
  };
}
