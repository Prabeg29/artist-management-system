import { Job, Worker } from 'bullmq';

import knexInstance from '../../database';
import { CreateTenantDto } from './tenant.type';
import { connectAllDb, getConnection } from '@utils/connectionManager';
import logger from '@utils/logger.util';

new Worker('create-tenant-db', async (job: Job<CreateTenantDto>) => {
  try {
    logger.info(`Creating database ${job.data.database} for tenant ${job.data.name}`);

    await knexInstance.raw(`CREATE DATABASE ${job.data.database};`);

    logger.info(`Database ${job.data.database} created for tenant ${job.data.name}`);
  
    await connectAllDb();
    
    logger.info(`Running migrations for database ${job.data.database}`);
  
    await getConnection(job.data.domain).migrate.latest();

    logger.info(`Migrations ran for database ${job.data.database}`);
  } catch (err) {
    logger.error(`Error while running migrations for tenant ${job.data.name} >> ${err} `);
  }
}, { connection: { host: 'redis', 'port': 6379 } });
