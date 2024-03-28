import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserDocument } from '../../model/UserModel';

export const comparePlainAndHashed = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const getHashedAuth = async (plainPassword: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainPassword, salt);
};

export const generateTokens = async (user: UserDocument) => {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  console.log('jwt key', JWT_SECRET);
  const accessToken = jwt.sign(
    {
      email: user.email,
      _id: user._id,
    },
    JWT_SECRET,
    {
      expiresIn: '10d',
    }
  );

  const refreshToken = jwt.sign(
    {
      email: user.email,
      _id: user._id,
      firstName: 'something',
    },
    JWT_SECRET,
    {
      expiresIn: '20d',
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

export default { comparePlainAndHashed, getHashedAuth, generateTokens };
