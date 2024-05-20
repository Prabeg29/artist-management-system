const makeDatabaseSlug = (tenantName: string): string => {
  return 'tenant_' + tenantName.toLowerCase().replace(/[\s-]+/g, '');
};

const makeDomain = (tenantName: string): string => {
  return tenantName.toLowerCase().replace(/[\s-]+/g, '-') + '.ams.test';
};

export { makeDatabaseSlug, makeDomain };
