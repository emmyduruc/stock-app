export interface User {
  email: string;
  password: string;
  firstname?: string;
}
export interface IAuthUser {
  acessToken: string;
  User: User;
}
