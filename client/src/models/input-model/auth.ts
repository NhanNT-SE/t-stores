export interface LoginInput {
  username: string;
  password: string;
  isRemember: boolean;
}

export interface LogoutInput {
  username: string;
  email: string;
  password: string;
}
