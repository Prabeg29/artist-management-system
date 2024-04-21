export interface Song {
  id: number;
  artist_id: number;
  title: string;
  album_name: string;
  genre: string;
  created_at: Date;
  updated_at: Date;
}

export type SongInput = Omit<Song, 'id'  | 'created_at' | 'updated_at'>; 

export interface SongDto {
  id: number;
  attributes: {
    title : string,
    album_name: string;
    genre: string;
    created_at: string;
    updated_at: string;
  }
}

export type SongDtoCollection = SongDto[];
