export type JwtPayload = {
  email: string;
  _id: string;
}

export type JwtTokens = {
  accessToken: string;
  refreshToken: string;
}