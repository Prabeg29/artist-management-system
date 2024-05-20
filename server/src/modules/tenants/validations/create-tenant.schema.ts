export const createTenantSchema = {
  type      : 'object',
  properties: {
    name    : { type: 'string', minLength: 1, maxLength: 255, },
    email   : { type: 'string', format: 'email', maxLength: 255, },
    password: {
      type     : 'string',
      minLength: 8,
      pattern  : '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]*$'
    },
    phone: { type: 'string', minLength: 1, maxLength: 20, },
  },
  required            : ['name', 'email', 'password', 'phone'],
  additionalProperties: false
};
