import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ArtistInput } from './artist.type';
import { ArtistMapper } from './artist.mapper';
import { ArtistService } from './artist.service';

export class ArtistController {
  constructor(protected readonly artistService: ArtistService) {}

  public index = async (
    req: Request<unknown, unknown, unknown, { currentPage?: string; perPage?: string;}>,
    res: Response
  ): Promise<void> => { 
    const { data: artists, paginationInfo } = await this.artistService.fetchAllPaginated(
      req.query.currentPage, 
      req.query.perPage
    );

    res.status(StatusCodes.OK).json({
      message: 'Artists fetched successfully',
      artists: ArtistMapper.toDtoCollection(artists),
      meta   : { paginationInfo },
    });
  };

  public store = async (req: Request, res: Response): Promise<void> => { 
    const artist = await this.artistService.create(req.body as ArtistInput);

    res.status(StatusCodes.CREATED).json({
      message: 'Artist created successfully.',
      data   : ArtistMapper.toDto(artist)
    });
  };

  public show = async (req: Request, res: Response): Promise<void> => { 
    const artist = await this.artistService.fetchOneById(parseInt(req.params.id));

    res.status(StatusCodes.OK).json({
      message: 'Artist fetched successfully.',
      data   : ArtistMapper.toDto(artist)
    });
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    const user = await this.artistService.update(parseInt(req.params.id), req.body as ArtistInput);

    res.status(StatusCodes.OK).json({
      message: 'Artist updated successfully',
      data   : ArtistMapper.toDto(user)
    });
  };

  public destroy = async (req: Request, res: Response): Promise<void> => {
    await this.artistService.delete(parseInt(req.params.id));

    res.status(StatusCodes.OK).json({ message: 'Artist deleted successfully' });
  };
}
