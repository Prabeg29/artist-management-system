import logger from '../utils/logger.util';
import { connectAllDb, connectionMap } from '../utils/db.util';

async function tenantMigration() {
  await connectAllDb();

  for (const tenant in connectionMap) {
    try {
      await connectionMap[tenant].migrate.latest();
    } catch (err) {
      logger.error(`Error while running migration for ${tenant}`, err);
    }
  }
}

tenantMigration();
