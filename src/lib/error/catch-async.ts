import { NextFunction } from 'express';
import { BadRequestError } from './api-error';

export const catchAsync = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  ErrorClass: new () => Error = BadRequestError
) => {
  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    try {
      return await fn(...(args as Parameters<T>));
    } catch (error) {
      const isController = fn.length === 3;

      if (error instanceof Error) {
        if (isController) {
          const next = args[2] as NextFunction;
          next(error);
          return undefined as Awaited<ReturnType<T>>;
        }
        throw error;
      }

      if (isController) {
        const next = args[2] as NextFunction;
        next(new ErrorClass());
        return undefined as Awaited<ReturnType<T>>;
      }

      throw new ErrorClass();
    }
  };
};
