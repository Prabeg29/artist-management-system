import { roles } from '@enums/roles.enum';
import { gender } from '@enums/gender.enum';

export const signupSchema = {
  type      : 'object',
  properties: {
    first_name: { type: 'string', maxLength: 255, },
    last_name : { type: 'string', maxLength: 255, },
    email     : { type: 'string', format: 'email', maxLength: 255, },
    password  : {
      type     : 'string',
      minLength: 8,
      pattern  : '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]*$'
    },
    phone  : { type: 'string', maxLength: 20, },
    dob    : { type: 'string', format: 'date' },
    gender : { enum: [gender.MALE, gender.FEMALE, gender.OTHER] },
    address: { type: 'string', maxLength: 255, },
    role   : { enum: [roles.ARTIST_MANAGER, roles.ARTIST] },
  },
  required            : ['first_name', 'last_name', 'email', 'password', 'phone', 'dob', 'gender', 'address', 'role'],
  additionalProperties: false
};
