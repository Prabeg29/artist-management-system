import config from '../../config';
import { User, UserResponseDto } from './user.type';

export class UserMapper {
  public static toDto (user: User & { token?: string; }): UserResponseDto {
    return {
      id        : user.id,
      attributes: {
        name      : user.fullName,
        email     : user.email,
        phone     : user.phone,
        dob       : user.dob?.toDateString(),
        gender    : user.gender,
        address   : user.address,
        role      : user.role,
        created_at: user.createdAt.toDateString(),
        updated_at: user.updatedAt.toDateString(),
      },
      token: user.token ? user.token : undefined,
      type : 'Bearer'
    };
  }

  public static toDtoCollection(users: User[]): Array<UserResponseDto> {
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
