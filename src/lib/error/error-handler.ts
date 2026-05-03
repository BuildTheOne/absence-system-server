import { HttpStatus } from '@/constants/http-status';
import { Message } from '@/constants/messages';
import { logger } from '@/lib/logger';
import { BaseResponse } from '@/lib/response';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from './api-error';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { method, url } = req;

  if (err instanceof ApiError) {
    const { statusCode, message } = err;
    logger.error({ method, url, statusCode, err }, message);
    return res.status(statusCode).json(BaseResponse(statusCode, message));
  }

  const fatalStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  logger.error(
    { method, url, statusCode: fatalStatusCode, err },
    Message.ERROR
  );
  return res
    .status(fatalStatusCode)
    .json(BaseResponse(fatalStatusCode, Message.ERROR));
}
