import { NextFunction, Request, Response } from 'express';

import { UserRole } from '../misc/types/User';
import { ForbiddenError } from '../errors/ApiError';
import { UserDocument } from '../model/UserModel';

function adminCheck(req: Request, res: Response, next: NextFunction) {
  const user: UserDocument | undefined = req.user as UserDocument | undefined;
  if (user && user.role === UserRole.Admin) {
    return next();
  }

  throw new ForbiddenError('Not allowed as Customer');
}

export default adminCheck;