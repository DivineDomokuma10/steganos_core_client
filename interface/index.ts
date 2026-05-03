export interface ILoginFields {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  userId: string;
}
