import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/ApiError';

function apiErrorhandler(error: ApiError, request: Request, response: Response, next: NextFunction) {
  if (!error.statusCode) {
    return response.status(500).json({ message: error.message ?? 'Internal error' });
  }
  
  return response.status(error.statusCode).json({ message: error.message });
}

export default apiErrorhandler;
