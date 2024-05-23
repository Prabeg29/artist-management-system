const makeDatabaseSlug = (tenantName: string): string => 'tenant_' + tenantName.toLowerCase().replace(/[\s-]+/g, '_');

const makeDomain = (tenantName: string): string => makeSlug(tenantName) + '.ams.test';

const makeSlug = (tenantName: string): string => tenantName.toLowerCase().replace(/[\s-]+/g, '-');

export { makeDatabaseSlug, makeDomain, makeSlug };
