import config from '../../config';
import { roles } from '../../enums/roles.enum';
import { Artist, ArtistDto, ArtistDtoCollection } from './artist.type';

export class ArtistMapper {
  public static toDto (artist: Artist): ArtistDto {
    return {
      id        : artist.artistId,
      attributes: {
        name                  : artist.fullName,
        email                 : artist.email,
        phone                 : artist.phone,
        dob                   : artist.dob.toDateString(),
        gender                : artist.gender,
        address               : artist.address,
        role                  : roles.ARTIST,
        firstReleaseYear      : artist.firstReleaseYear || undefined,
        numberOfAlbumsReleased: artist.numberOfAlbumsReleased || undefined,
        createdAt             : artist.createdAt.toDateString(),
        updatedAt             : artist.updatedAt.toDateString(),
      },
    };
  }

  public static toDtoCollection(artists: Artist[]): ArtistDtoCollection {
    return artists.map(artist => {
      return {
        ...ArtistMapper.toDto(artist),
        meta: {
          link: new URL(`${config.app.url}/api/artists/${artist.artistId}`),
        }
      };
    });
  }
}
