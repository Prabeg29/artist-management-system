import { genres } from '../../../enums/genres.enum';

export const UpdateSongSchema = {
  type         : 'object',
  minProperties: 1,
  properties   : {
    title     : { type: 'string', minLength: 1, maxLength: 255, },
    album_name: { type: 'string', minLength: 1, maxLength: 255, },
    genre     : { enum: [genres.RNB, genres.CLASSIC, genres.COUNTRY, genres.JAZZ, genres.ROCK] },
  },
  additionalProperties: false
};
