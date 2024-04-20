import {
  ExtractJwt,
  Strategy as JwtStrategy,
  VerifiedCallback,
} from 'passport-jwt';
import GoogleTokenStrartegy from 'passport-google-id-token';
import dotenv from 'dotenv';

import { JwtPayload } from '../misc/types/JwtPayload';
import usersService from '../services/usersService';
import User, { UserDocument } from '../model/UserModel';
import { NotFoundError } from '../errors/ApiError';
import { GoogleUserInfo, ParsedToken } from '../misc/types/GoogleCredential';
import { UserRole } from '../misc/types/User';
import AuthUtil from '../utils/AuthUtil';

dotenv.config({ path: '.env' });

const JWT_SECRET: string = process.env.JWT_SECRET as string;

export const jwtStrategy: JwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: JwtPayload, done: any) => {
    try {
      const userEmail: string = payload.email;
      const user: UserDocument | null = await usersService.getUserByEmail(
        userEmail
      );

      if (user && user.active) {
        return done(null, user);
      }

      // let message = 'User is not existed';
      // if (user && !user.active) {
      //   message = 'User is inactive';
      // }

      // throw new NotFoundError(message);
      throw new NotFoundError('User is inactive');
    } catch (e) {
      done(e, false);
    }
  }
);

const clientId: string = process.env.GOOGLE_CLIENT_ID as string;

export const googleStrategy = new GoogleTokenStrartegy(
  {
    clientID: clientId,
  },
  async function (
    parsedToken: ParsedToken,
    googleId: string,
    done: VerifiedCallback
  ) {
    try {
      const googleInfo: GoogleUserInfo = parsedToken.payload;
      const plainPasswordForGoogleLogin = `${googleInfo.given_name}_${googleInfo.family_name}`;
      const passwordForGoogleLogin: string = await AuthUtil.getHashedAuth(
        plainPasswordForGoogleLogin
      );

      const userInfo: UserDocument = new User({
        firstName: googleInfo.given_name,
        lastName: googleInfo.family_name,
        email: googleInfo.email,
        password: passwordForGoogleLogin,
        userName: googleInfo.name,
        role: UserRole.Customer,
        avatar: googleInfo.picture,
        address: 'Need to be updated', // Need to be updated
      });

      const user: UserDocument | null = await usersService.findOrCreateUser(
        userInfo,
        plainPasswordForGoogleLogin
      );
      if (user) {
        return done(null, user);
      }

      throw new NotFoundError('User is not found');
    } catch (e) {
      done(e, false);
    }
  }
);
