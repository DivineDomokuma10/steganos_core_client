export enum AUTH_ENDPOINTS {
  LOGIN = "/api/auth/login",
  LOGOUT = "/api/auth/logout",
  REFRESH = "/api/auth/refresh",
  REGISTER = "/api/auth/register",
}

export enum USER_ENDPOINTS {
  PROFILE = "/api/users/me/",
}

export enum STEG_ENDPOINTS {
  ENCODE = "/api/steg/encode/",
  DECODE = "/api/steg/decode/",
}
