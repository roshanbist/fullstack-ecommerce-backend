import { ExtractJwt, Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt';
import GoogleTokenStrartegy from 'passport-google-id-token';

import { JwtPayload } from '../misc/types/JwtPayload';
import usersService from '../services/usersService';
import User, { UserDocument } from '../model/UserModel';
import { BadRequest, NotFoundError } from '../errors/ApiError';
import dotenv from 'dotenv';
import { GoogleUserInfo, ParsedToken } from '../misc/types/GoogleCredential';
import { UserRole } from '../misc/types/User';
import mongoose from 'mongoose';
import AuthUtil from '../misc/utils/AuthUtil';

dotenv.config({ path: '.env' });

const JWT_SECRET: string = process.env.JWT_SECRET as string;

export const jwtStrategy: JwtStrategy = new JwtStrategy({
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (payload: JwtPayload, done: any) => {
  try {
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
    const plainPasswordForGoogleLogin = `${googleInfo.given_name}_${googleInfo.family_name}`;
    const passwordForGoogleLogin: string = await AuthUtil.getHashedAuth(plainPasswordForGoogleLogin);
    
    console.log('The password to send email', plainPasswordForGoogleLogin);
    const userInfo: UserDocument = new User({
      firstName: googleInfo.given_name,
      lastName: googleInfo.family_name,
      email: googleInfo.email,
      password: passwordForGoogleLogin,
      userName: googleInfo.name,
      role: UserRole.Customer,
      avatar: googleInfo.picture,
      address: 'Need new address' // Need to be address
    });
  
    const user: UserDocument | null = await usersService.findOrCreateUser(userInfo);
    if (user) {
      return done(null, user);
    }

    throw new NotFoundError('User is not found');
  } catch (e) {
    done(e, false);
  }
});