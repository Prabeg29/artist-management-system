import { gender } from '@enums/gender.enum';

export const UpdateArtistSchema = {
  type         : 'object',
  minProperties: 1,
  properties   : {
    first_name: { type: 'string', minLength: 1, maxLength: 255, },
    last_name : { type: 'string', minLength: 1, maxLength: 255, },
    email     : { type: 'string', format: 'email', maxLength: 255, },
    password  : {
      type     : 'string',
      minLength: 8,
      pattern  : '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]*$'
    },
    phone                    : { type: 'string', minLength: 1, maxLength: 20, },
    dob                      : { type: 'string', format: 'date' },
    gender                   : { enum: [gender.MALE, gender.FEMALE, gender.OTHER] },
    address                  : { type: 'string', minLength: 1, maxLength: 255, },
    first_release_year       : { type: 'number', minimum: 1860, maximum: 9999 },
    number_of_albums_released: { type: 'number' }
  },
  additionalProperties: false
};
