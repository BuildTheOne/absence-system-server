import { Message } from '@/constants/messages';
import { Request } from 'express';
import { pinoHttp } from 'pino-http';
import { logger } from './logger';

export const loggerMiddleware = pinoHttp({
  logger,
  serializers: {
    req: (_) => undefined,
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
  customLogLevel: (_, res, err) => {
    if (res.statusCode >= 400 || err) return 'silent';
    return 'info';
  },
  customSuccessMessage: (_, __) => {
    return Message.SUCCESS;
  },
  customSuccessObject: (req, res, val) => {
    return {
      method: req.method,
      url: req.url,
      query: (req as Request).query,
      statusCode: res.statusCode,
      responseTime: val.responseTime,
    };
  },
});
