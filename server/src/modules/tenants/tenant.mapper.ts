import config from '../../config';
import { Tenant, TenantResponseDto } from './tenant.type';

export class TenantMapper {
  public static toResponseDto (tenant: Tenant): TenantResponseDto {
    return {
      id        : tenant.id,
      attributes: {
        name    : tenant.name,
        domain  : tenant.domain,
        database: tenant.database,
      },
    };
  }

  public static toResponseDtoCollection(tenants: Tenant[]): TenantResponseDto[] {
    return tenants.map(tenant => {
      return {
        ...TenantMapper.toResponseDto(tenant),
        meta: {
          link: new URL(`${config.app.url}/api/tenants/${tenant.id}`),
        }
      };
    });
  }
}
