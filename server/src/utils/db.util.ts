import path from 'path';

import knex, { Knex } from 'knex';
import { StatusCodes } from 'http-status-codes';

import config from '../config';
import defaultConfig from '../knexfile';
import { dbTables } from '../enums/db-tables.enum';
import { Tenant } from '../modules/tenants/tenant.type';
import { HttpException } from '../exceptions/http.exception';

const defaultConn = knex(defaultConfig);

let connectionMap: { [x: string]: Knex; };

const createConnectionConfig = (tenant: Tenant) => {
  return {
    client    : config.db.client,
    connection: {
      host    : config.db.host,
      port    : config.db.port,
      user    : config.db.user,
      password: config.db.password,
      database: tenant.database,
    },
    migrations: {
      directory: path.join(__dirname, '../database/migrations'),
      tableName: 'migrations',
      extension: 'ts'
    },
    pool: { min: 2, max: 20 }
  };
};

const connectAllDb = async () => {
  let tenants: Tenant[];

  try {
    tenants = await defaultConn<Tenant>(dbTables.TENANTS).select(['id', 'domain', 'database']);
  } catch (e) {
    console.log('error', e);

    return;
  }

  connectionMap = tenants.reduce((map, tenant) => ({
    ...map,
    [tenant.domain]: knex(createConnectionConfig(tenant)),
  }), {});
};

const getConnection = (subdomain = ''): Knex => {
  if (!subdomain) {
    return defaultConn;
  }

  const conn = connectionMap[subdomain];

  if (!conn) {
    throw new HttpException('Connection is not set for any tenant database.', StatusCodes.BAD_REQUEST);
  }

  return conn;
};

interface PaginateOptions {
  currentPage: number;
  perPage: number;
  selectParams?: Array<string>;
  countParam?: string;
}

interface PaginationInfo {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  prevPage: number;
  nextPage: number;
}

const paginate = async <T>(
  queryBuilder: Knex.QueryBuilder,
  { currentPage, perPage, selectParams = ['*'], countParam = '*' }: PaginateOptions) => {
  if (currentPage < 1) {
    currentPage = 1;
  }

  const offSet = (currentPage - 1) * perPage;
  const data = await queryBuilder.clone().select(selectParams).limit(perPage).offset(offSet) as T[];
  const total = (await queryBuilder.clone().count(`${countParam} as count`).first()).count;
  const lastPage = Math.ceil(total / perPage);

  const paginationInfo: PaginationInfo = {
    total,
    perPage,
    currentPage,
    lastPage,
    prevPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage < lastPage ? currentPage + 1 : null,
  };

  return { data, paginationInfo };
};

export {
  defaultConn,
  connectAllDb,
  connectionMap,
  getConnection,
  paginate,
  PaginationInfo,
};