import { NextFunction, Request, RequestHandler, Response } from 'express';
import { BadRequestError } from './api-error';

export const catchAsyncController = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export const catchAsyncRepository = <
  T extends (...args: any[]) => Promise<any>,
>(
  fn: T
) => {
  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    try {
      return await fn(...args);
    } catch (error) {
      console.log(error);
      throw new BadRequestError();
    }
  };
};
