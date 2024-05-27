import { BaseRepository } from '../base.repository';
import { dbTables } from '../../enums/db-tables.enum';
import { CreateTenantDto, Tenant } from './tenant.type';
import { PaginationInfo, paginate } from '../../utils/db.util';
import { TenantRepositoryInterface } from './tenant.irepository';

export class KnexTenantRepository extends BaseRepository implements TenantRepositoryInterface {
  public async fetchOneByDomain(domain: string): Promise<Tenant | undefined> {
    return await this.knex<Tenant>(dbTables.TENANTS).where('domain', domain).whereNull('deletedAt').first();
  }

  public async fetchOneById(id: number): Promise<Tenant | undefined> {
    return await this.knex<Tenant>(dbTables.TENANTS).where('id', id).whereNull('deletedAt').first();
  }

  public async fetchAllPaginated(
    currentPage: number, perPage: number
  ): Promise<{ data: Tenant[]; paginationInfo: PaginationInfo; }> {
    return await paginate<Tenant>(this.knex<Tenant>(dbTables.TENANTS), { currentPage, perPage });
  }

  public async create(tenantData: CreateTenantDto): Promise<number[]> {
    return await this.knex(dbTables.TENANTS).insert({
      name    : tenantData.name,
      domain  : tenantData.domain,
      email   : tenantData.email,
      database: tenantData.database,
      slug    : tenantData.slug,
    }, ['id']);
  }
}
