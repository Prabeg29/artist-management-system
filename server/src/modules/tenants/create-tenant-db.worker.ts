import bcrypt from 'bcrypt';
import { Job, Worker } from 'bullmq';

import logger from '../../utils/logger.util';
import { roles } from '../../enums/roles.enum';
import { CreateTenantDto } from './tenant.type';
import { defaultConn } from '../../utils/db.util';
import { dbTables } from '../../enums/db-tables.enum';
import { connectAllDb, getConnection } from '../../utils/db.util';

new Worker('create-tenant-db', async (job: Job<CreateTenantDto>) => {
  try {
    logger.info(`Creating database ${job.data.database} for tenant ${job.data.name}`);

    await defaultConn.raw(`CREATE DATABASE IF NOT EXISTS ${job.data.database};`);

    logger.info(`Database ${job.data.database} created for tenant ${job.data.name}`);
  
    await connectAllDb();
    
    logger.info(`Running migrations for database ${job.data.database}`);

    const tenantDbConn = getConnection(job.data.domain);
  
    await tenantDbConn.migrate.latest();

    logger.info(`Migrations ran for database ${job.data.database}`);

    await tenantDbConn(dbTables.USERS).insert({
      'fullName': job.data.fullName,
      'email'   : job.data.email,
      'password': bcrypt.hashSync(job.data.password, 10),
      'role'    : roles.SUPER_ADMIN
    }, ['id']);

  } catch (err) {
    logger.error(`Error while running migrations for tenant ${job.data.name} >> ${err} `);
  }
}, { connection: { host: 'redis', 'port': 6379 } });
