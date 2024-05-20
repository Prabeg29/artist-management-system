import config from '../../config';
import { roles } from '../../enums/roles.enum';
import { Artist, ArtistDto, ArtistDtoCollection } from './artist.type';

export class ArtistMapper {
  public static toDto (artist: Artist): ArtistDto {
    return {
      id        : artist.artist_id,
      attributes: {
        name                     : artist.first_name + ' ' + artist.last_name,
        email                    : artist.email,
        phone                    : artist.phone,
        dob                      : artist.dob.toDateString(),
        gender                   : artist.gender,
        address                  : artist.address,
        role                     : roles.ARTIST,
        first_release_year       : artist.first_release_year || undefined,
        number_of_albums_released: artist.number_of_albums_released || undefined,
        created_at               : artist.created_at.toDateString(),
        updated_at               : artist.updated_at.toDateString(),
      },
    };
  }

  public static toDtoCollection(artists: Artist[]): ArtistDtoCollection {
    return artists.map(artist => {
      return {
        ...ArtistMapper.toDto(artist),
        meta: {
          link: new URL(`${config.app.url}/api/artists/${artist.artist_id}`),
        }
      };
    });
  }
}
