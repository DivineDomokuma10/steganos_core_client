export interface IRegisterResponse {
  userId: string;
}

export interface ILoginResponse extends IRegisterResponse {
  accessToken: string;
}

export interface IUserProfileResponse {
  _id: string;
  email: string;
  username: string;
}
