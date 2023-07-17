import { NextFunction, Request, Response} from 'express';

import knex from '../database';
import { roles } from '@enums/roles.enum';
import { StatusCodes } from 'http-status-codes';
import { HttpException } from '@exceptions/http.exception';
import { KnexUserRepository } from '@modules/user/knex-user.repository';


export const isSuperAdminOrArtistManager = async (req: Request, res: Response, next: NextFunction) => {
  const user = await (new KnexUserRepository(knex)).fetchOneById(req.userId);

  if (user.role !== roles.ARTIST_MANAGER && user.role !== roles.SUPER_ADMIN) {
    next(new HttpException('You are not authorized to view the resource', StatusCodes.FORBIDDEN));
  }

  next();
};