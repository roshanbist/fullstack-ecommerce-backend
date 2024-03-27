// Error: type of error
export class ApiError extends Error {
  constructor(readonly statusCode: number, readonly message: string) {
    super();
  }
}

// 400: bad request
export class BadRequest extends ApiError {
  constructor(readonly message: string = 'Bad request') {
    super(400, message);
  }
}

// 401: expired login or not logged in
export class UnauthorizedError extends ApiError {
  constructor(readonly message: string = 'Unauthorized request') {
    super(401, message);
  }
}

// 403: forbidden
export class ForbiddenError extends ApiError {
  constructor(readonly message: string = 'Forbidden') {
    super(403, message);
  }
}

// 404: not found
export class NotFoundError extends ApiError {
  constructor(readonly message: string = 'Not Found') {
    super(404, message);
  }
}

// 500: network error
export class InternalServerError extends ApiError {
  constructor(readonly message: string = 'Internal Server Error') {
    super(500, message);
  }
}