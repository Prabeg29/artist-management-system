import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { roles } from '@enums/roles.enum';
import { UserMapper } from '@modules/user/user.mapper';
import { UserService } from '@modules/user/user.service';
import { User, UserInput } from '@modules/user/user.type';
import { ArtistService } from '@modules/artists/artist.service';
import { Artist, ArtistInput } from '@modules/artists/artist.type';

export class AuthController {
  constructor(
    protected readonly userService: UserService,
    protected readonly artistService: ArtistService
  ) {}

  public signup = async (req: Request, res: Response): Promise<void> => {
    const { role }: { role: string; } = req.body;

    const user: User | Artist = role === roles.ARTIST ? 
      await this.artistService.create(req.body as ArtistInput) :
      await this.userService.create(req.body as UserInput);

    res.status(StatusCodes.CREATED).json({ message: 'User signup successful. Please login to proceed', user: UserMapper.toDto(user)});
  };

  public signin = async (req: Request, res: Response): Promise<void> => {
    const user = await this.userService.signin(req.body as UserInput);

    res.status(StatusCodes.OK).json({
      message: 'User signin successful.',
      data   : UserMapper.toDto(user)
    });
  };
}
