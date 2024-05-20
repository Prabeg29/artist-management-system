import { genres } from '../../../enums/genres.enum';

export const CreateSongSchema = {
  type      : 'object',
  properties: {
    title     : { type: 'string', minLength: 1, maxLength: 255, },
    album_name: { type: 'string', minLength: 1, maxLength: 255, },
    genre     : { enum: [genres.RNB, genres.CLASSIC, genres.COUNTRY, genres.JAZZ, genres.ROCK] },
  },
  required            : [ 'title', 'album_name', 'genre' ],
  additionalProperties: false
};
