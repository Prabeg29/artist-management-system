import { Song, SongInput } from '../song.type';

const songStub = (): Song[] => {
  return [
    {
      id        : 1,
      artist_id : 1,
      title     : 'Voodoo Child',
      album_name: 'Electric Ladyland',
      genre     : 'Gypsy Rock',
      created_at: new Date('2022-12-09 00:00:00'),
      updated_at: new Date('2022-12-09 00:00:00'),
    }
  ];
};

const songInputStub = (): SongInput => {
  return {
    artist_id : 1,
    title     : 'Voodoo Child',
    album_name: 'Electric Ladyland',
    genre     : 'Gypsy Rock',
  };
};

export { songStub, songInputStub };
