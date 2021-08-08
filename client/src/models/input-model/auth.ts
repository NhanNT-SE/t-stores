export interface LoginInput {
  username: string;
  password: string;
  isRemember: boolean;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  passwordConfirm?:string,
}
