export const signupSchema = {
  type      : 'object',
  properties: {
    tenantName: { type: 'string', minLength: 1, maxLength: 255, },
    fullName  : { type: 'string', minLength: 1, maxLength: 255, },
    email     : { type: 'string', format: 'email', maxLength: 255, },
    password  : {
      type     : 'string',
      minLength: 8,
      pattern  : '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]*$'
    },
  },
  required            : ['tenantName', 'fullName', 'email', 'password'],
  additionalProperties: false
};

export const signinSchema = {
  type      : 'object',
  properties: {
    email   : { type: 'string', format: 'email', maxLength: 255, },
    password: {
      type     : 'string',
      minLength: 8,
      pattern  : '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]*$'
    },
  },
  required            : ['email', 'password'],
  additionalProperties: false
};
