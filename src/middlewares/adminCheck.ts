import { NextFunction, Request, Response } from 'express';

import { User, UserRole } from '../misc/types/User';
import { ForbiddenError } from '../errors/ApiError';

function adminCheck(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // TODO: will update once security part 
  // if (user && user.role === UserRole.Admin) {
  //   return next();
  // }
  // throw new ForbiddenError('This page is not allowed as customer');

  next();
}

export default adminCheck;