import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const RequestIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers['x-request-id']) {
      req.headers['x-request-id'] = uuidv4();
    }

    next();
  } catch (error) {
    next(error);
  }
};
