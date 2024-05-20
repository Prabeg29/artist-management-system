import { User } from '../user/user.type';

export interface Artist extends User {
  artist_id: number,
  first_release_year?: number;
  number_of_albums_released?: number;
}

export type ArtistInput = Omit<Artist, 'id' | 'role' | 'artist_id' | 'created_at' | 'updated_at'>; 

export interface ArtistDto {
  id: number;
  attributes: {
    name : string,
    email: string;
    phone: string;
    dob: string;
    gender: string;
    address: string;
    role: string;
    first_release_year?: number;
    number_of_albums_released?: number;
    created_at: string;
    updated_at: string;
  }
}

export type ArtistDtoCollection = ArtistDto[];
