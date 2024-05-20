import { StatusCodes } from 'http-status-codes';

import config from '@config';
import { PaginationInfo } from '../../database';
import { pagination } from '@enums/pagination.enum';
import { CreateTenantDto, Tenant } from './tenant.type';
import { HttpException } from '@exceptions/http.exception';
import { TenantRepositoryInterface } from './tenant.irepository';

export class TenantService {
  constructor(protected readonly tenantRepository: TenantRepositoryInterface) { }

  public async create(tenantData: CreateTenantDto): Promise<Tenant | undefined> {
    const isExistingTenant = await this.tenantRepository.fetchOneByDomain(tenantData.domain);

    if (isExistingTenant) {
      throw new HttpException('Tenant with the domain already exists',StatusCodes.BAD_REQUEST);
    }

    const [tenantId] = await this.tenantRepository.create(tenantData);

    await config.queues.createTenantDb.add(`create-db-for-tenant-${1}`, tenantData);

    return await this.tenantRepository.fetchOneById(tenantId);
  }

  public async fetchAllPaginated(
    currentPage: string, 
    perPage: string
  ): Promise<{ data: Tenant[]; paginationInfo: PaginationInfo; }> { 
    const currentPageNumber = Number(currentPage)|| pagination.DEFAULT_PAGE;
    const perPageNumber = Number(perPage) || pagination.DEFAULT_RECORDS_PER_PAGE;

    return await this.tenantRepository.fetchAllPaginated(currentPageNumber, perPageNumber);
  }
}