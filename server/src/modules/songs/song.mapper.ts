import { Song, SongDto, SongDtoCollection } from './song.type';

export class SongMapper {
  public static toDto (song: Song): SongDto {
    return {
      id        : song.id,
      attributes: {
        title     : song.title,
        album_name: song.album_name,
        genre     : song.genre,
        created_at: song.created_at.toDateString(),
        updated_at: song.updated_at.toDateString(),
      },
    };
  }

  public static toDtoCollection(songs: Song[]): SongDtoCollection {
    return songs.map(song => SongMapper.toDto(song));
  }
}
