import { User } from '../user/user.type';

export interface Artist extends User {
  artistId: number,
  firstReleaseYear?: number;
  numberOfAlbumsReleased?: number;
}

export type ArtistInput = Omit<Artist, 'id' | 'role' | 'artistId' | 'createdAt' | 'updatedAt'>; 

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
    firstReleaseYear?: number;
    numberOfAlbumsReleased?: number;
    createdAt: string;
    updatedAt: string;
  }
}

export type ArtistDtoCollection = ArtistDto[];
