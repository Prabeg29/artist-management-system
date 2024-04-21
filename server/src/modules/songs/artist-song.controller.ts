import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { SongInput } from './song.type';
import { SongMapper } from './song.mapper';
import { SongService } from './song.service';

export class ArtistSongController {
  constructor(protected readonly songService: SongService) {}

  public index = async (req: Request<ParamsDictionary, unknown, unknown, { currentPage: string; perPage: string;}>, res: Response): Promise<void> => { 
    const { data: songs, paginationInfo } = await this.songService.fetchAllPaginated(
      parseInt(req.params.artistId),
      req.query.currentPage, 
      req.query.perPage
    );

    res.status(StatusCodes.OK).json({
      message: 'Songs fetched successfully',
      users  : SongMapper.toDtoCollection(songs),
      meta   : {
        paginationInfo: paginationInfo
      },
    });
  };
  
  public store = async (req: Request, res: Response): Promise<void> => { 
    const song = await this.songService.create(parseInt(req.params.artistId), req.body as SongInput);
    
    res.status(StatusCodes.CREATED).json({
      message: 'Song created successfully',
      song   : SongMapper.toDto(song),
    });
  };

  public update = async (req: Request, res: Response): Promise<void> => { 
    const song = await this.songService.update(parseInt(req.params.artistId), parseInt(req.params.songId), req.body as SongInput);

    res.status(StatusCodes.OK).json({
      message: 'Song updated successfully',
      song   : SongMapper.toDto(song),
    });
  };

  public destroy = async (req: Request, res: Response): Promise<void> => { 
    await this.songService.delete(parseInt(req.params.songId));

    res.status(StatusCodes.OK).json({
      message: 'Song deleted successfully',
    });
  };
}
