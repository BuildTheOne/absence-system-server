import { BadRequestError } from '@/lib/error';
import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';

export function validateForm(schema: ZodType) {
  return (req: Request, _: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const formattedError = result
        .error!.issues.map((err) => err.message)
        .join(', ');
      throw new BadRequestError(formattedError);
    }
    next();
  };
}
