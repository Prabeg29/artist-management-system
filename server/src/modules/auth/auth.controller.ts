import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { UserInput } from '../user/user.type';
import { UserMapper } from '../user/user.mapper';
import { UserService } from '../user/user.service';
import { CreateTenantDto } from '../tenants/tenant.type';
import { TenantService } from '../tenants/tenant.service';
import { makeDatabaseSlug, makeDomain, makeSlug } from '../../utils/tenant.util';

export class AuthController {
  constructor(
    protected readonly tenantService: TenantService,
    protected readonly userService: UserService,
  ) {}

  public signup = async (req: Request, res: Response): Promise<void> => {
    await this.tenantService.create(
      {
        domain  : makeDomain(req.body.tenantName),
        database: makeDatabaseSlug(req.body.tenantName),
        name    : req.body.tenantName,
        slug    : makeSlug(req.body.tenantName),
        ...req.body 
      } as CreateTenantDto
    );

    res.status(StatusCodes.CREATED)
      .json({ message: 'Signup successfully.' });
  };

  public signin = async (req: Request, res: Response): Promise<void> => {
    const user = await this.userService.signin(req.body as UserInput);

    res.status(StatusCodes.OK).json({
      message: 'User signin successful.',
      data   : UserMapper.toDto(user)
    });
  };
}
