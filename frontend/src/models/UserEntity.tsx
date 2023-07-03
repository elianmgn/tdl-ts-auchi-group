// Define el tipo de usuario
export type UserEntity = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  userToken?: string;
  profileUrl?: string;
};
