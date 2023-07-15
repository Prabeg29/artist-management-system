import config from '@config';
import { User, UserDto, UserDtoCollection } from './user.type';

export class UserMapper {
  public static toDto (user: User & {token?: string;}): UserDto {
    return {
      id        : user.id,
      attributes: {
        name      : user.first_name + ' ' + user.last_name,
        email     : user.email,
        phone     : user.phone,
        dob       : user.dob.toDateString(),
        gender    : user.gender,
        address   : user.address,
        role      : user.role,
        created_at: user.created_at.toDateString(),
        updated_at: user.updated_at.toDateString(),
      },
      token: user.token ? user.token : undefined,
    };
  }

  public static toDtoCollection(users: User[]): UserDtoCollection {
    return users.map(user => {
      return {
        ...UserMapper.toDto(user),
        meta: {
          link: new URL(`${config.app.url}/api/users/${user.id}`),
        }
      };
    });
  }
}
