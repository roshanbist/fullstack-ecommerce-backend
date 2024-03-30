export type GoogleUserInfo = {
  email: string;
  email_verified: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
}

export type ParsedToken = {
  payload: GoogleUserInfo
}