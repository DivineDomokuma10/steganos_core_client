export interface IRegisterResponse {
  userId: string;
}

export interface ILoginResponse {
  userId: string;
  accessToken: string;
}

export interface IUserProfileResponse {
  _id: string;
  email: string;
  username: string;
}
