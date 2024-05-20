import { PaginationInfo } from '../../database';
import { CreateTenantDto, Tenant } from './tenant.type';

export interface TenantRepositoryInterface{
  fetchOneById(id: number): Promise<Tenant | undefined>;
  fetchOneByDomain(domain: string): Promise<Tenant | undefined>;
  fetchAllPaginated(currentPage: number, perPage: number): Promise<{ data: Tenant[]; paginationInfo: PaginationInfo; }>;
  create(tenantData: CreateTenantDto): Promise<number[]>;
}