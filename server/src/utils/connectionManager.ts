import path from 'path';

import knex, { Knex } from 'knex';
import { StatusCodes } from 'http-status-codes';

import config from '@config';
import knexInstance from '../database';
import { dbTables } from '@enums/db-tables.enum';
import { Tenant } from '@modules/tenants/tenant.type';
import { HttpException } from '@exceptions/http.exception';

let connectionMap: { [x: string]: Knex; };

const createConnectionConfig = (tenant: Tenant) => {
  return {
    client    : config.db.client,
    connection: {
      host    : config.db.host,
      port    : config.db.port,
      user    : config.db.user,
      database: tenant.database,
      password: config.db.password
    },
    migrations: {
      directory: path.join(__dirname, 'database/migrations'),
      tableName: 'migrations',
      extension: 'ts'
    },
    pool: { min: 2, max: 20 }
  };
};

export const connectAllDb = async () => {
  let tenants: Tenant[];

  try {
    tenants = await knexInstance<Tenant>(dbTables.TENANTS).select(['id', 'domain', 'database']);
  } catch (e) {
    console.log('error', e);

    return;
  }

  connectionMap = tenants.reduce((map, tenant) => ({
    ...map,
    [tenant.domain]: knex(createConnectionConfig(tenant)),
  }), {});
};

export const getConnection = (subdomain = ''): Knex => {
  if (!subdomain) {
    return knexInstance;
  }

  const conn = connectionMap[subdomain];

  if (!conn) {
    throw new HttpException('Connection is not set for any tenant database.', StatusCodes.BAD_REQUEST);
  }

  return conn;
};

