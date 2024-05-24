import { roles } from '../../enums/roles.enum';

export interface User {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  phone?: string;
  dob?: Date;
  gender?: string;
  address?: string;
  role: roles.ARTIST | roles.ARTIST_MANAGER | roles.SUPER_ADMIN;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserInput = Omit<User, 'id' | 'created_at' | 'updated_at'>; 

export interface UserResponseDto {
  id: number;
  attributes: {
    name : string,
    email: string;
    phone: string;
    dob: string;
    gender: string;
    address: string;
    role: roles.ARTIST | roles.ARTIST_MANAGER | roles.SUPER_ADMIN;
    created_at: string;
    updated_at: string;
  },
  token? : string,
  bearer : string
}

export type UserResponseDtoCollection = UserResponseDto[];
