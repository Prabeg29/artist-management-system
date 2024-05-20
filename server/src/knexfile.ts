import path from 'path';

import knex from 'knex';

import config from './config';

const defaultConfig =  {
  client    : config.db.client,
  connection: {
    host    : config.db.host,
    port    : config.db.port,
    user    : config.db.user,
    password: config.db.password,
    database: config.db.database,
  },
  migrations: {
    directory: path.join(__dirname, 'database/migrations/admin'),
    tableName: 'migrations',
    extension: 'ts'
  },
  seeds: {
    directory: path.join(__dirname, 'database/seeds'),
    extension: 'ts'
  },
};

const defaultConn = knex(defaultConfig);

export { defaultConfig, defaultConn };
