import { NextFunction, Request, Response } from 'express';
import { User, UserRole } from '../misc/types/User';
import { ForbiddenError } from '../errors/ApiError';

function adminCheck(
  user: User,
  request: Request,
  response: Response,
  next: NextFunction
) {
  // 1. Pass User
  // 2. Get the user from redux
  
  // Check user role
  if (user && user.role === UserRole.Admin) {
    return next();
  }

  throw new ForbiddenError('This page is not allowed as customer');
}

export default adminCheck;