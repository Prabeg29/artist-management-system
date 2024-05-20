import { Router } from 'express';

import { validate } from '@middlewares/validator';
import { tryCatchWrapper } from '@utils/try-catch-wrapper';
import { TenantService } from '@modules/tenants/tenant.service';
import { TenantController } from '@modules/tenants/tenant.controller';
import { KnexTenantRepository } from '@modules/tenants/knex-tenant.repository';
import { createTenantSchema } from '@modules/tenants/validations/create-tenant.schema';

const router: Router = Router();
const tenantController = new TenantController(new TenantService(new KnexTenantRepository()),);

router.get('/', tryCatchWrapper(tenantController.index));
router.post('/', validate(createTenantSchema), tryCatchWrapper(tenantController.store));

export default router;
