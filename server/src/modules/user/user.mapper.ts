import { User, UserDto } from './user.type';

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
      meta: user.token ? {
        token_type: 'bearer',
        token     : user.token,
      } : undefined,
    };
  }
}
