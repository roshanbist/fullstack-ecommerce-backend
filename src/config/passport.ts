import { ExtractJwt, Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt';
import GoogleTokenStrartegy from 'passport-google-id-token';

import { JwtPayload } from '../misc/types/JwtPayload';
import usersService from '../services/usersService';
import UserModel, { UserDocument } from '../model/UserModel';
import { NotFoundError } from '../errors/ApiError';
import dotenv from 'dotenv';
import { GoogleUserInfo, ParsedToken } from '../misc/types/GoogleCredential';
import { UserRole } from '../misc/types/User';

dotenv.config({ path: '.env' });

const JWT_SECRET: string = process.env.JWT_SECRET as string;

export const jwtStrategy: JwtStrategy = new JwtStrategy({
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (payload: JwtPayload, done: any) => {
  try {
    console.log('payload in jwtstrategy, config', payload);
    const userEmail: string = payload.email;
    const user: UserDocument | null = await usersService.getUserByEmail(userEmail);
    if (user) {
      return done(null, user);
    }
    throw new NotFoundError('User is not found');
  } catch (e) {
    done(e, false); 
  }
});

const clientId: string = process.env.GOOGLE_CLIENT_ID as string;

export const googleStrategy = new GoogleTokenStrartegy({
  clientID: clientId
}, async function (parsedToken: ParsedToken, googleId: string, done: VerifiedCallback) {
  try {
    const googleInfo: GoogleUserInfo = parsedToken.payload;
    const userInfo: UserDocument = new UserModel({
      firstName: googleInfo.given_name,
      lastName: googleInfo.family_name,
      email: googleInfo.email,
      password: `${googleInfo.given_name}_${googleInfo.family_name}`,
      userName: googleInfo.name,
      role: UserRole.Customer,
      avatar: googleInfo.picture,
      address: ''
    });
  
    const user: UserDocument | null = await usersService.findOrCreateUser(userInfo);
    if (user) {
      done(null, user);
    }
    
    throw new NotFoundError('User is not found');
  } catch (e) {
    done(e, false);
  }
});

/* Address with google login 
  1. Notify user, you cannot use email if you used google login
  2. Provide random passowrd, notify user, change password
*/