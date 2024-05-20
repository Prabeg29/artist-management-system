import path from 'path';

import { Queue } from 'bullmq';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env')});

export default {
  app: {
    port    : process.env.APP_PORT || 3000,
    url     : process.env.APP_URL || 'http://localhost:3000',
    logLevel: process.env.LOG_LEVEL || 'info',
  },
  db: {
    client  : process.env.DB_CONNECTION || 'mysql2',
    host    : process.env.DB_HOST,
    port    : process.env.DB_PORT || 3306,
    database: process.env.DB_DATABASE,
    user    : process.env.DB_USERNAME || 'artist-management-system',
    password: process.env.DB_PASSWORD || ''
  },
  queues: {
    createTenantDb: new Queue('create-tenant-db', { connection: { host: 'redis', 'port': 6379 } }),
  },
  secrets: {
    jwt: process.env.JWT_SECRET,
  }
};
