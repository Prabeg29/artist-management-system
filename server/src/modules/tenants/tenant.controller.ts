import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { TenantMapper } from './tenant.mapper';
import { TenantService } from './tenant.service';
import { CreateTenantDto, Tenant } from './tenant.type';
import { makeDatabaseSlug, makeDomain } from '../../utils/tenant.util';

export class TenantController {
  constructor(protected readonly tenantService: TenantService) {}

  public index = async (
    req: Request<ParamsDictionary, unknown, unknown, { currentPage: string; perPage: string;}>,
    res: Response
  ): Promise<void> => { 
    const { data: tenants, paginationInfo } = await this.tenantService.fetchAllPaginated(
      req.query.currentPage, 
      req.query.perPage
    );

    res.status(StatusCodes.OK).json({
      message: 'Tenants fetched successfully',
      songs  : TenantMapper.toResponseDtoCollection(tenants),
      meta   : {
        paginationInfo: paginationInfo
      },
    });
  };

  public store = async (req: Request, res: Response): Promise<void> => {
    const tenant: Tenant = await this.tenantService.create(
      {
        domain  : makeDomain(req.body.name),
        database: makeDatabaseSlug(req.body.name),
        ...req.body 
      } as CreateTenantDto
    );

    res.status(StatusCodes.CREATED)
      .json({ message: 'Tenant created successfully.', tenant: TenantMapper.toResponseDto(tenant) });
  };
}
