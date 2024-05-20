export type Tenant = {
  id: number;
  name: string;
  domain: string;
  email: string;
  phone: string;
  database: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type CreateTenantDto = Omit<Tenant, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> & { password: string; };

export type TenantResponseDto = {
  id: number;
  attributes: {
    name : string,
    domain: string;
    database: string;
  },
}