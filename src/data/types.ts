export enum UserRole  {
 ADMIN = "ADMIN",
 USER = "USER"
};

export type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    role: UserRole
};

export type Playlist = {
  id: number
  name: string
  genre: string;
  musics: string[];
  user_id: number
};
