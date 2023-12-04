export interface UserInterface {
  id?: number;
  email: string;
  password: string;
  name?: string;
}

export interface UserData {
  name: string;
  email: string;
  avatarUrl?: string;
  description?: string;
}

export interface UpdateUser {
  description?: string;
  imageUrl?: string;
}