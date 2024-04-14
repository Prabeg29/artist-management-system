import { Artist, ArtistInput } from '../artist.type';

const artistStub = (): Artist[] => {
  return [
    {
      id                       : 1,
      first_name               : 'Timi',
      last_name                : 'Hemdrix',
      email                    : 'voodoochild@gmail.com',
      phone                    : '9800000000',
      dob                      : new Date('2022-12-09 00:00:00'),
      gender                   : 'male',
      role                     : 'artist',
      address                  : 'Seattle, US',
      artist_id                : 1,
      first_release_year       : 1967,
      number_of_albums_released: 3,
      created_at               : new Date('2022-12-09 00:00:00'),
      updated_at               : new Date('2022-12-09 00:00:00'),
    }
  ];
};

const artistInputStub = (): ArtistInput => {
  return {
    first_name               : 'Timi',
    last_name                : 'Hemdrix',
    email                    : 'voodoochild@gmail.com',
    password                 : 'P@ssword123$',
    phone                    : '9800000000',
    dob                      : new Date('2022-12-09 00:00:00'),
    gender                   : 'male',
    address                  : 'Seattle, US',
    first_release_year       : 1967,
    number_of_albums_released: 3,
  };
};

export { artistStub, artistInputStub };
