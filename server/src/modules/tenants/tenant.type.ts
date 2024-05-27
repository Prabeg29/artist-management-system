export type Tenant = {
  id: number;
  name: string;
  domain: string;
  email: string;
  verifiedAt?: Date;
  database: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export type CreateTenantDto = Omit<Tenant, 'id' | 'verifiedAt' | 'createdAt' | 'updatedAt' | 'deletedAt'> & { fullName: string; password: string; };

export type TenantResponseDto = {
  id: number;
  attributes: {
    name : string,
    domain: string;
    database: string;
  },
};
