export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  phone: string;
  dob: Date;
  gender: string;
  address: string;
  role: string;
  created_at?: Date;
  updated_at?: Date;
}

export type UserInput = Omit<User, 'id' | 'created_at' | 'updated_at'>; 

export interface UserDto {
  id: number;
  attributes: {
    name : string,
    email: string;
    phone: string;
    dob: string;
    gender: string;
    address: string;
    role: string;
    created_at: string;
    updated_at: string;
  },
  token? : string,
}

export type UserDtoCollection = UserDto[];
